const Router = require('koa-router');

const menuRouter = new Router({prefix: '/menu'});

const { 
  verifyMenuName, 
  verifyRequiredInfo,
  verifyType,
  verifyMenuInfo,
  getMenuTree 
 } = require('../middleware/menu.middleware');

const { 
  create, 
  deleteMenu,
  updateMenu, 
  getMenuDetail, 
  getMenuList,

} = require('../controller/menu.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

// 1. 创建菜单: 菜单名唯一,更新超级管理员的所有权限
menuRouter.post('/', verifyAuth,verifyMenuName, verifyRequiredInfo,create);

// 2. 删除菜单: 2.1 如果删除父级菜单那么对应所有的子菜单都会删除
menuRouter.delete('/:id',verifyAuth, verifyType, deleteMenu);

// 3. 修改菜单：
menuRouter.patch('/:id',verifyAuth,verifyMenuInfo,  updateMenu);

// 4. 获取某个菜单的详细信息
menuRouter.get('/:id',verifyAuth, getMenuDetail);

// 5. 获取本系统所有的菜单
menuRouter.post('/list',verifyAuth, getMenuTree,getMenuList)

module.exports = menuRouter;