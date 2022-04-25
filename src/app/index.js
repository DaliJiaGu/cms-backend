const Koa = require('koa');
const bodyParser = require('koa-bodyparser')

const useRouter = require('../router/index')

const handleError = require('./handle-error')
const uniteResponse = require('../middleware/uniteResponse.middleware')


const app = new Koa();

app.use(bodyParser());

app.use(uniteResponse());
useRouter(app);

app.on('error',handleError);

module.exports = app