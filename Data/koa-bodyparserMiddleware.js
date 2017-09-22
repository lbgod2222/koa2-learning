const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

//解析中间件
app.use(bodyParser())

app.use( async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        // get 请求返回表单页面
        let html = `
          <h1>Request post demo</h1>
          <form method="POST" action="/">
            <p>用户名</p>
            <input name="username"><br />
            <p>密码</p>
            <input name="password" type="password"><br />
            <p>邮箱</p>
            <input name="email" type="email"><br />
            <button type="submit">提交</button>
          </form>
        `
        ctx.body = html
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        // post时候 解析post内容
        let postData = ctx.request.body
        ctx.body = postData
    } else {
        ctx.body = `<h1>NOT FOUND</h1>`
    }
})

app.listen(3000, () => {
    console.log('parser middleware is running at 3000')
})