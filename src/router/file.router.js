const Router = require('koa-router');

const fileRouter = new Router({prefix: '/upload'});

const { pictureHandler } = require('../middleware/file.middleware');

const { savePictureInfo } = require('../controller/file.controller');
const { verifyAuth } = require('../middleware/auth.middleware');


// 上传图片：1. 读取图片信息 2.将图片信息保存到数据库 
fileRouter.post('/picture', verifyAuth,pictureHandler, savePictureInfo);



module.exports = fileRouter;