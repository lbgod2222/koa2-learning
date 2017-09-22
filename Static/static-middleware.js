const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

// 静态资源相对路径
const staticPath = './static'

app.use(static(
    path.join((__dirname, staticPath))
))

// middleware 会自动加载html 没有则会加载下面的 
app.use(async(ctx) => {
    ctx.body = 'hello world'
})

app.listen(3000, () => {
    console.log('static middleware is running at 3000')
})