
const service = require('../service/user.service')

class userController {
  async createUser(ctx, next){
    // 1. 获取用户输入的内容
    const user = ctx.request.body;
    
    // 2. 进行网络请求，这一步得在service层完成
    try {
      await service.createUser(user);
      ctx.success('创建用户成功', 200)
    } catch (error) {
      console.log(error);
      ctx.fail('创建失败',500)
    }

  }

  async deleteUser(ctx, next){
    const userId = ctx.params.userId;
    try {
      await service.deleteUser(userId);
      ctx.success('成功删除用户', 200)
    } catch (error) {
      console.log(error);
      ctx.fail()
    }
  }

  async updateUser(ctx, next){
    const user = ctx.request.body;
    const userId = ctx.params.userId;
    try {
      await service.updateUser(user, userId);
      ctx.success("修改用户成功",200)
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  }

  async getUserDetail(ctx, next){
    const userId = ctx.params.userId;
    try {
      const res = await service.getUserDetail(userId);
      ctx.success(res[0], 200)
    } catch (error) {
      console.log(error);
      ctx.fail();
    }
  } 

  async getUserList(ctx, next){
    const userInfo = ctx.userInfo;
    try {
      const res = await service.getSearchOfUser(userInfo);
      const totalCount = res.length;
      ctx.success({list:res, totalCount}, 200)
    } catch (error) {
      console.log(error);
      ctx.fail()
    }
  }
}

module.exports = new userController()