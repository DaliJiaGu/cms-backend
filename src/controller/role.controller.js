const service = require('../service/role.service');
const {getMenuByIds } = require('../utils/getTreeMenu')


class RoleController{
  async success(ctx, next){
    ctx.success('创建角色成功')
  }

  async deleteRole(ctx, next){
    const id = ctx.params.id;
    try {
      await service.deleteRole(id);
      ctx.success('删除角色成功')
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async updateRole(ctx, next){
    const {name, intro} = ctx.request.body;
    const id = ctx.params.id;
    try {
      await service.updateRole(name, intro,id);
      ctx.success('修改角色成功')
    } catch (error) {
      ctx.fail();
    }

  }

  async getRoleDetail(ctx, next){
    const id = ctx.params.id;
    try {
      const res = await service.getRoleDetailById(id);
      ctx.success(res[0]);
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async getsearchList(ctx, next){
    const roleSearch = ctx.roleSearch;
    const res = await service.getSearchList(roleSearch);
    ctx.roleMenus = res;
    await next();
  }

  async showRoleList(ctx, next){
    const roleListResult = ctx.roleMenus;
    const resMenu = ctx.menuList;
    
    for(let i = 0; i < roleListResult.length; i++){
      roleListResult[i].menuList = resMenu[i];
    }
    const totalCount = roleListResult.length;
    ctx.success({list: roleListResult, totalCount})
  }

  // 根据传入的id来获取某个角色对应的菜单权限
  async getRoleMenu(ctx, next){
    const id = ctx.params.id;
    const res = await service.getRoleMenuById(id);
    // menuIds:[1,2,3,4...]
    const menuIds = [];
    for(const item of res){
      menuIds.push(item.menuId);
    }
    ctx.menuList = [];
    await getMenuByIds(ctx, menuIds);
    await next();
  }

  // 根据传入的角色id展示该角色对应的所有权限
  async showRoleMenuById(ctx,next){
    const menuList = ctx.menuList;
    ctx.success(menuList[0])
  }
}
module.exports = new RoleController();