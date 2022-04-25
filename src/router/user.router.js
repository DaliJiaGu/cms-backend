const Router = require('koa-router');

const {
  createUser, 
  deleteUser, 
  updateUser, 
  getUserDetail,
  getUserList
} = require('../controller/user.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

const {
  verifyUser, 
  handlePassword, 
  verifyIsExists,
  verifyUserName,
  verifyInfo
} = require('../middleware/user.middleware');

const userRouter = new Router({prefix:'/users'});

userRouter.post('/',verifyAuth, verifyUser ,handlePassword, createUser);

// 删除用户，因为这里前端已经设置了权限，所以这里可以直接删除。
userRouter.delete('/:userId', verifyAuth,verifyIsExists, deleteUser)

// 修改用户
userRouter.patch('/:userId',verifyAuth,verifyIsExists, verifyUserName, updateUser)

// 查询某个用户
userRouter.get('/:userId',verifyAuth,verifyIsExists, getUserDetail)

// 查询用户列表：包括分页查询和模糊查询

userRouter.post('/list',verifyAuth, verifyInfo, getUserList)

module.exports = userRouter