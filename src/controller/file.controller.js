const service = require('../service/file.service');
const goodsService = require('../service/goods.service')
const { APP_HOST, APP_PORT} = require('../app/config');
class FileController{
  async savePictureInfo(ctx, next){

    // 1. 获取图片信息
    const { filename, mimetype, size } = ctx.req.file;
    const goodsId = ctx.query.goodsId;

    // 2. 将图片信息保存到数据库: 判断数据原本存在与否，然后对应进行更新或者插入操作
    const res = await service.getFileByGoodsId(goodsId);
    if (res.length > 0) {
      await service.updateFile(filename,mimetype,size,goodsId)
    }else{
      await service.createFlie(filename, mimetype, size, goodsId);
    }

    // 3. 设置图片的地址并把图片信息上传到数据库的goods表中的imguRl字段
    const imgUrl = `${APP_HOST}:${APP_PORT}/goods/${goodsId}/picture/${filename}`
    try {
      await goodsService.updateImgUrlById(imgUrl, goodsId);
      ctx.success('图片上传成功');
    } catch (error) {
      console.log(error);
      ctx.fail();
    }


  }
}

module.exports = new FileController();