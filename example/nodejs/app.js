const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const routers = require('./server/router/router')

const app = new Koa()

app.use(bodyParser())

// 加载模板引擎
app.use(views(path.join(__dirname, './server/view'), {
    extension: 'ejs'
}))

app.use(async (ctx, next) => {
    let url = ctx.request.url
    
    console.log(url);
    await next();
})

// 加载路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.use(async (ctx) => {
    let url = ctx.request.url

    url = 'router: ' + url

    ctx.body = url
})

app.listen(3000, () => {
    console.log('server is starting at http://localhost:3000/')
})