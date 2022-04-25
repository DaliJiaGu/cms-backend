const service = require('../service/department.service')
const errorTypes = require('../constants/error-types');
const { matchDepartment } = require('../utils/matchInfo');

// 检查部门是否存在
const verifyDepartmentName = async (ctx, next) =>{
  const {name} = ctx.request.body;
  const res = await service.getDepartmentName(name);
  // 部门名已经存在
  if (res.length > 0) {
    const error = new Error(errorTypes.NAME_IS_EXISTS);
    return ctx.app.emit('error',error,ctx);
  }

  await next();
}
// 检查必须输入的信息有没有输入
const verifyDepartmentInfo = async (ctx, next) => {
  const {name, parentId, leader} = ctx.request.body;
  if (!name || !parentId || !leader) {
    const error = new Error(errorTypes.MESSAGE_IS_NOT_FULL);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

const verifyPatchName = async (ctx, next) => {
  const id= ctx.params.id;
  const { name } = ctx.request.body;

  const realName = await service.getNameById(id);
  // 说明对部门名称有做修改，所以要进行验证是否存在名称
  // realname: [{name:''}]
  if (realName[0].name !== name ) {
    const res = await service.getDepartmentName(name);
    // 部门名已经存在
    if (res.length > 0) {
      const error = new Error(errorTypes.NAME_IS_EXISTS);
      return ctx.app.emit('error',error,ctx);
    }
  }
  await next();
}

// 根据id检查某个部门是否存在
const verifyIsExists = async (ctx, next) => {
  const id = ctx.params.id;
  const res = await service.getNameById(id);
  if (res.length == 0) {
    const error = new Error(errorTypes.DEPARTMENT_IS_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}


// 检查搜索框的内容
const verifyDepartmentSearch = async (ctx, next) => {
  const Info = ctx.request.body;
  const realInfo = matchDepartment(Info);
  ctx.departmentSearch = realInfo;
  await next();
} 

module.exports = {
  verifyDepartmentName,
  verifyDepartmentInfo,
  verifyPatchName,
  verifyIsExists,
  verifyDepartmentSearch

}