const Router = require('koa-router');
const departmentRouter = new Router({prefix: '/department'});

const { 
  create, 
  deleteDepartment,
  updateDepartment,
  getDepartmentDetail,
  getDepartmentList
} = require('../controller/department.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

const { 
  verifyDepartmentName, 
  verifyDepartmentInfo, 
  verifyPatchName,
  verifyIsExists,
  verifyDepartmentSearch
} = require('../middleware/department.middleware');

departmentRouter.post('/',verifyAuth,verifyDepartmentInfo ,verifyDepartmentName, create);

departmentRouter.delete('/:id',verifyAuth, deleteDepartment)

departmentRouter.patch('/:id', verifyAuth,verifyPatchName, updateDepartment);

departmentRouter.get('/:id', verifyAuth,verifyIsExists, getDepartmentDetail );

departmentRouter.post('/list',verifyAuth, verifyDepartmentSearch, getDepartmentList)
module.exports = departmentRouter;