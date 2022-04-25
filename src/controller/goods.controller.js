const fs = require('fs')

const service = require('../service/goods.service');
const fileService = require('../service/file.service');

class GoodsController{
  async create(ctx, next){
    try {
      await service.createGoods(ctx);
      const {name,categoryId } = ctx.request.body;
      const res = await service.getGoodsIdByName(name);
      await service.createGoodsCategory(res[0].id,categoryId)
      ctx.success('创建商品成功');
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }
  async showPicture(ctx, next){
    const { goodsId } = ctx.params;
    const res = await fileService.getFileByGoodsId(goodsId);
    if (res.length > 0) {
      const pictureMessage = res[0];
      // 提供图片的信息
      ctx.response.set('content-type', pictureMessage.mimetype);
      ctx.body = fs.createReadStream(`./uploads/pictures/${pictureMessage.filename}`);
    }else{
      ctx.fail('该商品没有图片')
    }

  }

  async deleteGoods(ctx, next){
    const { goodsId } = ctx.params;
    try {
      await service.deleteGoods(goodsId);
      ctx.success('商品删除成功')
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async getGoodsList(ctx, next){
    const goodsSearch = ctx.goodsSearch;
    // console.log(goodsSearch);
    try {
      const res =  await service.getGoodsList(goodsSearch);
      // const totalCount= res.length;
      ctx.success({list: res,totalCount: 20})
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
    
  }
  async getCategoryCount(ctx, next){
    try {
      const res = await service.getCategoryCount();
      ctx.success(res)
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
    
  }

  async getCategorySale(ctx, next){
    try {
      const res = await service.getCategorySale();
      ctx.success(res)
    } catch (error) {
      ctx.fail()
    }

  }

  async getCategoryFavor(ctx, next){
    try {
      const res = await service.getCategoryFavor();
      ctx.success(res);
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async getAddressSale(ctx, next){
    try {
      const res = await service.getAddressSale();
      ctx.success(res)
    } catch (error) {
      console.log(error);
      ctx.fail();
    }

  }
  async getAmount(ctx, next){
    try {
      const res = await service.getAmount();
      ctx.success(res)
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }
}

module.exports = new GoodsController();