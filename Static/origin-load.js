const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
const mimes = require('./util/mimes')

const app = new Koa()

// 静态目录相对路径
const staticPath = './static'

// 解析资源类型 
function parseMime( url ) {
    let extName = path.extname(url)  // if "a.html" return .html
    extName = extName ? extName.slice(1) : 'unknown'
    return mimes[extName]
}

app.use(async(ctx) => {
    // 静态资源绝对路径
    let fullStaticPath = path.join(__dirname, staticPath) // "a" + "b" 自动加/

    // 获取静态资源内容，（文件内容， 目录， 404）
    let _content  = await content(ctx, fullStaticPath)

    // 解析请求内容的类型
    let _mime = parseMime(ctx.url)

    // 假如有请求内容的类型
    if( _mime ){
        ctx.type = _mime
    }
    // 输出静态资源
    if (_mime && _mime.indexOf('image/') >= 0) {
        // 图片可能性,用原生node,res，输出二进制数据
        ctx.res.writeHead(200)
        ctx.res.write(_content, 'binary')
        ctx.res.end()
    } else {
        // 如果是其他情况就输出内容文本
        ctx.body = _content
    }
})

// 监听端口
app.listen(3000, () => {
    console.log('Origin static load is running at 3000')
})