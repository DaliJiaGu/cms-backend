const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = require('../app/config')

const errorTypes = require('../constants/error-types')
const service = require('../service/user.service')
const md5Password  = require('../utils/md5')

const verifyLogin = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2. 判断用户名和密码是否为空
  if(!name || !password){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断用户是否存在
  const result = await service.getUserByName(name);
  const user = result[0];
  // 如果用户不存在
  if(!user){
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error',error,ctx);
  }

  // 4. 判断密码是否一致
  if(md5Password(password) !== result[0].password){
    const error = new Error(errorTypes.PASSWORD_IS_ERROR);
    return ctx.app.emit('error', error, ctx)
  }

  // 将登录拿到的用户信息保存到ctx
  ctx.user = user;
  await next()
}

// 这里是验证token是否有效的
const verifyAuth = async(ctx, next) => {
  console.log('验证token是否有效的middleware');
  // 1. 取出token
  const authorization = ctx.headers.authorization;
  if(!authorization){
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '');

  // 2. 进行jwt验证
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    ctx.user = res;
    await next();

  } catch (err) {
    console.log(err);
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx)
  }


}

module.exports = {
  verifyLogin,
  verifyAuth
}