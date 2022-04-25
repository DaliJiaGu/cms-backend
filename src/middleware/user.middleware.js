const errorTypes = require('../constants/error-types')
const service = require('../service/user.service');
const { matchUserInfo } = require('../utils/matchInfo');
const md5Password = require('../utils/md5')


// 这是检验用户名和密码是否合格的中间件
 
const verifyUser = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password,realname,cellphone,departmentId,roleId } = ctx.request.body;

  // 2. 判断用户名和密码是否为空
  if(!name || !password ){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx)
  }

  // 2.1 判断用户其他信息是否输出完全
  if(!realname || !cellphone || !departmentId || !roleId){
    const error = new Error(errorTypes.MESSAGE_IS_NOT_FULL);
    return ctx.app.emit('error', error,ctx)
  }
  
  // 3. 判断用户名是否已经存在
  const res = await service.getUserByName(name);

  if(res.length > 0){
    // 说明用户已经存在
    const error = new Error(errorTypes.NAME_IS_EXISTS);
    return ctx.app.emit('error', error, ctx)
  }

  await next();
}

//只是对密码进行加密的方法
const handlePassword = async (ctx, next) => {
  const {password} = ctx.request.body;
  ctx.request.body.password = md5Password(password);

  await next()
}

// 检查用户是否存在
const verifyIsExists = async(ctx, next) => {
  const userId = ctx.params.userId;
  const res = await service.getUserById(userId);
  if(res.length === 0){
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  await next();

}

// 检查用户名是否存在
const verifyUserName = async(ctx, next) => {

    const {name} = ctx.request.body;

    const userId = ctx.params.userId;
    const userRes = await service.getUserById(userId);
    const userName = userRes[0].name;
    // 如果用户修改了用户名
    if(userName !== name){
      const res = await service.getUserByName(name);

      if(res.length > 0){
        // 说明用户已经存在
        const error = new Error(errorTypes.NAME_IS_EXISTS);
        return ctx.app.emit('error', error, ctx)
      }
    }
    await next();
}

/* 
  收集用户输入，包括name\cellphone等字段，
  通过在进行网路查询的时候，检测
  name || '%' 
  也就是说如果用户没有输入的话就直接使用通配符
*/

const verifyInfo = async (ctx, next) => {
  console.log(1);
    const Info = ctx.request.body;
    const realInfo = matchUserInfo(Info);
    ctx.userInfo = realInfo;
    await next();
}
module.exports = {
  verifyUser,
  handlePassword,
  verifyIsExists,
  verifyUserName,
  verifyInfo
}