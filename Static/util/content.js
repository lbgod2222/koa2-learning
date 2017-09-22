const path = require('path')
const fs = require('fs')

// 封装读取目录内容的方法
const dir = require('./dir')

// 封装读取文件内容的方法
const file = require('./file')

// 获取静态资源内容
// @param {object} ctx koa-contex
// @param {string} 静态资源目录的绝对路径
// @return {string} 请求获取的本地内容

async function content(ctx, fullStaticPath){
    // 封装请求资源的绝对路径
    let reqPath = path.join(fullStaticPath, ctx.url)

    // 判断目录是否为已存在的目录或者文件
    let exist = fs.existsSync(reqPath)

    // 返回请求内容,默认为空
    let content = ''

    if (!exist) {
        // 如不存在
        content = 'Not fOUND'
    } else {
        // 判断访问地址是文件夹还是文件
        let stat = fs.statSync(reqPath)

        if (stat.isDirectory()) {
            // 如果是目录
            content = dir(ctx.url, reqPath)
        } else {
            // 如果请求为文件， 读取内容
            content = await file(reqPath)
        }
    }
    return content
}

module.exports = content