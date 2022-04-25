 const service = require('../service/menu.service');
 const errorTypes = require('../constants/error-types');
const {getChildMenu} = require('../utils/getChildMenu');
// const getTreeMenu = require('../utils/getTreeMenu');
const {getTreeMenu} = require('../utils/getTreeMenu')

 const verifyMenuName = async (ctx, next) => {
  console.log(888);
  const {name} = ctx.request.body;

  const res = await service.getMenuByName(name);
  if (res.length > 0) {
    const error = new Error(errorTypes.NAME_IS_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  await next()
 }

 const verifyRequiredInfo = async (ctx, next) => {
   const {name, type} = ctx.request.body;
   if (!name || !type) {
     const error = new Error(errorTypes.MESSAGE_IS_NOT_FULL);
     return ctx.app.emit('error', error, ctx)
   }
   await next();
 }

//  拿到删除的菜单对应的父级菜单的id
const verifyType = async (ctx, next) => {
  const id = ctx.params.id; 
  const deleteIds = await getChildMenu(id);
  ctx.deleteIds = deleteIds;
  await next();
}

const verifyMenuInfo = async (ctx, next) => {
  const id = ctx.params.id;
  const {name, type, parentId} = ctx.request.body;
  const types = [1,2,3];
  // 1. 检查输入的类型是否存在
  if (types.indexOf(Number(type)) === -1) {
    const error = new Error(errorTypes.MENU_TYPE_IS_NOT_ALLOWED);
    return ctx.app.emit('error', error, ctx);
  }
  
  // 2. 检查parentId是否存在
  const res = await service.getMenuNameById(parentId);
  if (!res) {
    const error = new Error(errorTypes.PARENT_MENU_IS_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 3. 检验菜单名是否合法
  const menuName =await service.getMenuNameById(id);
  // 表示已经修改了名称，所以检验
  if (menuName.name !== name) {
    await verifyMenuName(ctx,next);
  }else{
    await next();
  }

  
}

// 4. 将menulsit转换为树形结构
const getMenuTree = async (ctx, next) => {
  const rootList = await service.getRootList();
  // console.log(rootList);
  const resList = getTreeMenu(rootList, null, []);
  console.log(resList);
  ctx.menuTree = resList;
  await next();
}

 module.exports = {
   verifyMenuName,
   verifyRequiredInfo,
   verifyType,
   verifyMenuInfo,
   getMenuTree
 }