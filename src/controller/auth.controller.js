const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config')

class authController {
  async login(ctx, next){
    // 来到这里说明用户已经验证成功了，所以在这里生成token
    const { id, name } = ctx.user;
    // 颁发令牌
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 60*60*24
    })
    ctx.success({ id, name, token},200)
    // ctx.body = {}
  }

  async success(ctx, next){
    ctx.body = '验证成功'
  }
}

module.exports = new authController()