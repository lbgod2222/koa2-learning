const Koa = require('koa')
const app = new Koa()

app.use(async(ctx) => {
    if (ctx.url === '/index') {
        ctx.cookies.set(
            'cid',
            'hello world',
            {
                domain: 'localhost',             // 域名
                path: '/index',                  // 路径名   cookie会将相同域名和相同路径名的cookie储存在相同的文件下
                maxAge: 10 * 60 * 1000,          // 持久过期时间
                expires: new Date('2017-09-13'), // 到期时间
                httpOnly: false,                 // js 无法读取  防止XSS攻击
                overwrite: false                 // 
            }
        )
        ctx.body = 'Cookie is already set'
    } else {
        ctx.body = 'hello world'
    }
})

app.listen(3000, () => {
    console.log("Cookie setter is running at 3000")
})