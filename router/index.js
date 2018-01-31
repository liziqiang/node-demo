const router = require('koa-router')();
const routes = require('./routes');

Object.keys(routes).forEach((v) => {
    let route = routes[v];
    router.use(route.path, route.router.routes(), route.router.allowedMethods());
});

module.exports = router;