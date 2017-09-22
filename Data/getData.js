const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    let url = ctx.url
    // data from request
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring

    // 直接获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
})

app.listen(3000, () => {
    console.log('Get running at 3000')
})