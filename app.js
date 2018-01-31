const fs = require('fs');
const Koa = require('koa');
const Serve = require('koa-static');
const App = new Koa();

// 静态资源
App.use(Serve('build'));

/**
 * 封装异步文件读取
 * @param {*} page
 */
function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./views/${page}.html`;
        fs.readFile(viewUrl, 'binary', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/**
 * 根据url内容获取html内容
 * @param {*} url
 */
async function route(url) {
    let view = url.substr(1) || 'index';
    let validViews = ['index'];
    if (!validViews.includes(view)) {
        view = '404';
    }
    return await render(view);
}

// 输出页面
App.use(async (ctx) => {
    let url = ctx.request.url;
    ctx.body = await route(url);
});
App.listen(80);
