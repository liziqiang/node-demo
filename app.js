const Koa = require('koa');
const path = require('path');
const staticFiles = require('koa-static');
const App = new Koa();
const router = require('./router');

// 静态资源
App.use(staticFiles(path.join(__dirname, './build')));
// 路由
App.use(router.routes()).use(router.allowedMethods());
// 启动程序并监听80
App.listen(80);
