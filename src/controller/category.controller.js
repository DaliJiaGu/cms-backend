
const service = require('../service/category.service')
const errorTypes = require('../constants/error-types')

class CategoryController{
  async create(ctx, next){
    const { name } = ctx.request.body;
    try {
      await service.createCategory(name);
      ctx.success('创建商品类别成功')
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async deleteCategory(ctx, next){
    const { id } = ctx.params;
    try {
      await service.deleteCategory(id);
      ctx.success('删除分类成功')
    } catch (error) {
      console.log(error);
      ctx.fail()
    }
  }

  async updateCategory(ctx, next){
    const { name } = ctx.request.body;
    const { id } = ctx.params;
    
    const res = await service.checkName(name);
    if (res.length > 0) {
      const error = new Error(errorTypes.NAME_IS_EXISTS);
      return ctx.app.emit('error', error, ctx)
    }

    try {
      await service.updateCategory(name,id);
      ctx.success('更新分类成功')
    } catch (error) {
      console.log(error);
      ctx.fail()
    }
  }

  async getCategoryList(ctx, next){
    const searchInfo = ctx.searchInfo;
    try {
      const res = await service.getCategoryList(searchInfo);
      const totalCount= res.length;
      ctx.success({list: res,totalCount})
    } catch (error) {
      console.log(error);
      ctx.fail()
    }
  }
}

module.exports = new CategoryController();