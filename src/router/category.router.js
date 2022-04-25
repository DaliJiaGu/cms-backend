const Router = require('koa-router');

const categoryRouter = new Router({prefix: '/category'});

const {verifyName, handleSearchInfo } = require('../middleware/category.middleware');

const { create, deleteCategory, updateCategory, getCategoryList } = require('../controller/category.controller');
const { verifyAuth } = require('../middleware/auth.middleware');



// 1. 增加分类
categoryRouter.post('/',verifyAuth, verifyName, create)

// 2. 删除分类
categoryRouter.delete('/:id',verifyAuth, deleteCategory);

// 3. 更新分类
categoryRouter.patch('/:id',verifyAuth, updateCategory);

// 4. 获取分类的列表
categoryRouter.post('/list',verifyAuth, handleSearchInfo, getCategoryList);


module.exports = categoryRouter;