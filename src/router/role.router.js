const Router = require('koa-router');
const roleRouter = new Router({prefix:'/role'})

const { 
  create, 
  handleMenuList,
  deleteOriginMenu,
  verifyRoleSearch,
  getMenuListByIds
} = require('../middleware/role.middleware')
const { 
  success,
  deleteRole,
  updateRole,
  getRoleDetail,
  getsearchList,
  showRoleList,
  getRoleMenu,
  showRoleMenuById
 } = require('../controller/role.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

// 1. 创建角色
roleRouter.post('/', verifyAuth, create, handleMenuList, success);

// 2. 删除角色
roleRouter.delete('/:id', verifyAuth,deleteRole);

// 3. 修改角色
roleRouter.patch('/:id',verifyAuth,deleteOriginMenu, updateRole);

// 4. 获取某个角色的详细信息
roleRouter.get('/:id',verifyAuth, getRoleDetail);

// 5. 获取所有角色列表
roleRouter.post('/list',verifyAuth, verifyRoleSearch,getsearchList, getMenuListByIds, showRoleList );

// 6. 获取角色对应的菜单权限
roleRouter.get('/:id/menu',verifyAuth,getRoleMenu, showRoleMenuById)

module.exports = roleRouter;

