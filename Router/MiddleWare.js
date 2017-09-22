const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const Router = require('koa-router')


//子路由
let home = new Router()
home.get('/', async( ctx ) => {
    let html = `
        <ul>
        <li><a href="/page/helloworld">/page/helloworld</a></li>
        <li><a href="/page/404">/page/404</a></li>
        </ul>
        `
    ctx.body = html
})

// 子2
let page = new Router()
page.get('/404', async(ctx) => {
    ctx.body = 'NOT FOUND'
}).get('/helloworld', async(ctx) => {
    ctx.body = 'helloworld page'
}).get('/', async(ctx) => {
    ctx.body = 'page root'
})

// load all routes
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('Middleware is running at 3000')
})