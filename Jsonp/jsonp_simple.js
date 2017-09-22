const Koa = require('koa')
const app = new Koa()

app.use(async(ctx) => {
    // 如果jsonp的请求为GET
    if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp' ) {
        
        // jsonp 's callback
        let callbackName = ctx.query.callback || 'callback'
        let returnData = {
            success: true,
            data: {
                text: 'this is a jsonp',
                time: new Date().getTime(),
            }
        }

        // jsonp的script字符串
        let jsonStr = `;${callbackName}(${JSON.stringify(returnData)})`

        // 用text/javascript,闪现支持跨域请求
        ctx.type = 'text/javascript'

        // 输出字符串
        ctx.body = jsonStr
    } else {
        ctx.body = 'Hello jsonp'
    }
})

app.listen(3000, () => {
    console.log('Jsonp is running at 3000')
})