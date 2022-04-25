const service = require('../service/department.service')

class departmentController{
  async create(ctx, next){
    const department = ctx.request.body;
    try {
      await service.create(department);
      ctx.success('创建部门成功',200)
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async deleteDepartment(ctx, next){
    const id = ctx.params.id;
    try {
      await service.deleteDepartment(id);
      ctx.success('删除部门成功',200)
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async updateDepartment(ctx, next){
    const id = ctx.params.id;
    const Info = ctx.request.body;
    console.log(id, Info);
    try {
      await service.updateDepartment(id, Info);
      ctx.success('修改部门信息成功', 200)
    } catch (error) {
      
    }
  }

  async getDepartmentDetail(ctx, next){
    const id = ctx.params.id;
    try {
      const res = await service.getDepartmentDetail(id);
      ctx.success(...res, 200)
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async getDepartmentList(ctx, next){
    const userInfo = ctx.departmentSearch;
    try {
      const res = await service.getDepartmentList(userInfo);
      const totalCount = res.length;
      ctx.success({list:res,totalCount}, 200)
    } catch (error) {
      console.log(error);
      ctx.fail()
    }
  }
}

module.exports = new departmentController();