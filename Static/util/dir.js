const url = require('url')
const fs = require('fs')
const path = require('path')

// 遍历读取目录的内容方法
const walk = require('./walk')

// 封装目录内容
// @param { string } url 当前请求的url
// @param { string } reqPath 请求静态资源的完整本地路径
// @return { string } 返回目录内容，返回HTML

function dir(url, reqPath){
    // 遍历读取当前目录下的文件/子目录
    let contentList = walk(reqPath)

    let html = `<ul>`
    for(let [index, item] of contentList.entries()) {
        html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a>`
    }
    html = `${html}</ul>`

    return html
}

module.exports = dir