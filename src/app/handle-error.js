const errorType = require('../constants/error-types')


const handleError = (error, ctx) => {
  let message;
  let status;

  switch (error.message){
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; //  Bad Request
      message = "用户名和密码不能为空";
      break;
    case errorType.MESSAGE_IS_NOT_FULL:
      status = 400; //  Bad Request
      message = "信息没有收集完全~";
      break;
    case errorType.NAME_IS_EXISTS:
      status = 409; //conflict
      message = "名称已经存在";
      break;
    case errorType.USER_DOES_NOT_EXISTS:
      status = 400;   //参数错误
      message = "用户不存在";
      break;
    case errorType.PASSWORD_IS_ERROR:
      status = 400;   //参数错误
      message = "密码错误";
      break;
    case errorType.UNAUTHORIZATION:
      status = 401;   //未授权
      message = "无效的token";
      break;
    case errorType.DEPARTMENT_IS_NOT_EXISTS:
      status = 400;   //参数错误
      message = "该部门不存在";
      break;
    case errorType.MENU_TYPE_IS_NOT_ALLOWED:
      status = 400;   //参数错误
      message = "该菜单的类型未定义，请输入1~3";
      break;
    case errorType.PARENT_MENU_IS_NOT_EXISTS:
      status = 400;   //参数错误
      message = "父级菜单不存在，请校验";
      break;
    default:
      status = 404;
      message = "NOT FOUND"
  }

  ctx.status = status;
  ctx.body = message;
}

module.exports = handleError