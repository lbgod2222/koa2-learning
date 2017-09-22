const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()

// 通向DB
let store = new MysqlSession({
    user: 'root',
    password: '6671303',
    database: 'koa_test',
    host: '127.0.0.1'
})

// cookie 存向数据库
let cookie ={
    maxAge: '',
    expires: '',
    path: '',
    domain: '',
    httpOnly: '',
    overwrite: '',
    secure: '',
    sameSite: '',
    signed: ''
}


// 使用Middleware
app.use(session({
    key: 'SESSION_ID',
    store: store,
    cookie: cookie
}))

app.use(async(ctx) => {
    // 设置session
    if (ctx.url === '/set') {
        ctx.session = {
            user_id: Math.random().toString(36).substr(2),
            count: 0
        }
        ctx.body = ctx.session
    } else if (ctx.url === '/') {
        // 首页读取session
        ctx.session.count = ctx.session.count + 1
        ctx.body = ctx.session
    }
})

app.listen(3000, () => {
    console.log("session middleware is running at 3000")
})