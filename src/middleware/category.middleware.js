const service = require('../service/category.service');
const errorTypes = require('../constants/error-types');
const { matchCategoryInfo } = require('../utils/matchInfo');

const verifyName = async (ctx, next) => {
  const {name} = ctx.request.body;
  const res = await service.checkName(name);
  if (res.length > 0) {
    const error = new Error(errorTypes.NAME_IS_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

const handleSearchInfo = async (ctx, next) => {
  const searchInfo = ctx.request.body;
  const realInfo = matchCategoryInfo(searchInfo);
  ctx.searchInfo = realInfo;
  await next();
}

module.exports = {
  verifyName,
  handleSearchInfo
}