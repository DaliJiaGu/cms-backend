const errorTypes = require('../constants/error-types');
const { matchGoodsInfo } = require('../utils/matchInfo');

const verifyGoodsInfo = async (ctx, next) => {
  const { name, newPrice, status, categoryId } = ctx.request.body;
  if (!name || !newPrice || !status || !categoryId) {
    console.log(1);
    const error = new Error(errorTypes.MESSAGE_IS_NOT_FULL);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

const handleSearchInfo = async ( ctx, next) => {
  const searchInfo = ctx.request.body;
  const realInfo = matchGoodsInfo(searchInfo);
  ctx.goodsSearch = realInfo;
  await next();
}

module.exports = {
  verifyGoodsInfo,
  handleSearchInfo
}