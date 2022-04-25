const service = require('../service/role.service');

const errorTypes = require('../constants/error-types');
const { matchRoleInfo } = require('../utils/matchInfo');
const {getMenuByIds} = require('../utils/getTreeMenu');
// 1. 先将用户信息插入
const create = async (ctx, next) => {
  // 1.1 检查角色名的唯一性
  const { name, intro } = ctx.request.body;
  const resName  = await service.getIdByName(name);
  if(resName.length > 0){
    const error = new Error(errorTypes.NAME_IS_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  
  // 1.2 将数据插入数据库
  try {
    await service.createRole(name,intro);
    await next();
  } catch (error) {
    console.log(error);
    ctx.fail();
  }
  
}
// 2. 根据roleName来获取id，将menuList插入到表格rolemenus
const handleMenuList = async (ctx, next) => {
  const { menuList, name } = ctx.request.body;
  const roleId = await service.getIdByName(name);
  try {
    await service.createRoleMenu(roleId[0].id, menuList);
    await next();
  } catch (error) {
    console.log(error);
    ctx.fail();
  }

}

const deleteOriginMenu = async (ctx, next) => {
  // 1. 检查是否修改角色名，如果修改要保证其唯一性
  const {name, menuList} = ctx.request.body;
  const id = ctx.params.id;
  const resName = await service.getNameById(id);
  if (resName[0].name !== name) {
    const res = await service.getIdByName(name);
    if (res.length > 0) {
      const error = new Error(errorTypes.NAME_IS_EXISTS);
      return ctx.app.emit('error', error, ctx);
    }
  }
  // 2. 将原来的menulist删除
  try {
    await service.deleteOriginMenu(id);
    await service.createRoleMenu(id, menuList);
    await next();
  } catch (error) {
    console.log(error);
    ctx.fail();
  }
}

const verifyRoleSearch = async (ctx, next) => {
  const roleInfo = ctx.request.body;
  const realInfo = matchRoleInfo(roleInfo);
  ctx.roleSearch = realInfo;
  await next();
}

// 根据搜索到的menuIds来获取对应的menu的数据集
const getMenuListByIds =async (ctx, next) => {
  const roleMenus = ctx.roleMenus;
  ctx.menuList = [];
  // 遍历数组拿到每一个menuIds，分别请求数据并构建树形结构
  for(let item of roleMenus){
    const menuIds = item.menuList;
    await getMenuByIds(ctx, menuIds)
  }
  await next();
} 

module.exports = {
  create,
  handleMenuList,
  deleteOriginMenu,
  verifyRoleSearch,
  getMenuListByIds
}