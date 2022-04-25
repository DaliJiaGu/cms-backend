
const Router = require('koa-router');

const goodsRouter = new Router({prefix:'/goods'});

const { verifyGoodsInfo, handleSearchInfo } = require('../middleware/goods.middleware')

const { 
  create,
  showPicture, 
  deleteGoods, 
  getGoodsList, 
  getCategoryCount,
  getCategorySale,
  getCategoryFavor,
  getAddressSale,
  getAmount
} = require('../controller/goods.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

// 1. 增加商品
goodsRouter.post('/', verifyAuth, verifyGoodsInfo, create);

// 2. 读取图片
goodsRouter.get('/:goodsId/picture/:filename', verifyAuth,showPicture);

// 3. 删除图片
goodsRouter.delete('/:goodsId',verifyAuth, deleteGoods);

// 4. 获取商品列表
goodsRouter.post('/list',verifyAuth, handleSearchInfo, getGoodsList);

// 5. 获取每个分类商品的个数
goodsRouter.get('/category/count',verifyAuth, getCategoryCount);

// 6. 获取每个分类商品的总销量
goodsRouter.get('/category/sale',verifyAuth, getCategorySale);

// 7. 获取每个分类商品的总收藏
goodsRouter.get('/category/favor',verifyAuth, getCategoryFavor);

// 8. 获取每个城市对应销量
goodsRouter.get('/address/sale',verifyAuth, getAddressSale);

// 9. 商品数据统计的销量
goodsRouter.get('/amount/list',verifyAuth, getAmount)

module.exports = goodsRouter;