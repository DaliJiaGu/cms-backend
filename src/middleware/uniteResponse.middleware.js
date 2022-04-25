const uniteResponse = (option = {}) => {
  return async function (ctx, next) {
    ctx.success = function (data, code) {
      ctx.status = code || option.successCode || 200;
      ctx.body = {
        code: code || option.successCode || 200,
        data: data
      }
    }
    
    ctx.fail = function (msg, code) {
      console.log(msg);
      ctx.status = code || option.failCode || 400;
      ctx.body = {
        code: code || option.failCode || 400,
        msg: msg || option.failMsg || 'fail',
      }
    }

    await next()
  }
}


module.exports = uniteResponse