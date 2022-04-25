const service = require('../service/menu.service');
const roleService = require('../service/role.service');

class menuController {
  async create(ctx, next){
    const menuInfo = ctx.request.body;
    try {
      await service.createMenu(menuInfo);

      // 针对有多个超级管理员的情况
      const res = await roleService.getIdByName('超级管理员');
      // res：[ { id: 1 } ]
      for(const item of res){
        await service.updateSuperMangerMenu(item.id);
      }
      ctx.success('创建菜单成功')
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async deleteMenu(ctx, next){
    const deleteIds = ctx.deleteIds;
    try {
     await deleteIds.forEach(id => {
        service.deleteMenuById(id)
      })
      ctx.success('删除菜单成功');
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async updateMenu(ctx, next){
    const updateInfo = ctx.request.body;
    const menuId = ctx.params.id;
    try {
      await service.updateMenu(updateInfo,menuId);
      ctx.success('修改菜单信息成功')
    } catch (error) {
      ctx.fail();
    }
  }

  async getMenuDetail(ctx, next){
    const id = ctx.params.id;
    try {
      const res = await service.getMenuDetail(id);
      ctx.success(res[0]);
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }


  async getMenuList(ctx, next){
    try {
      const rootList = ctx.menuTree;
      const totalCount = rootList.length;
      ctx.success({list:rootList,totalCount})
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }
}

module.exports = new menuController()