const router = require('koa-router')();
const render = require('../utils/render');

module.exports = {
    home: {
        path: '/',
        router: router.get('/', async (ctx) => {
            ctx.body = await render('index');
        })
    },
    '404': {
        path: '',
        router: router.get('*', async (ctx) => {
            ctx.body = await render('404');
        })
    }
};