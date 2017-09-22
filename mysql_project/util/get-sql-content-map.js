// 获取所有SQL脚本内容

const fs = require('fs')
const getSqlMap = require('./get-sql-map')

let sqlContentMap = {}

// 读取sql文件内容
// @param {string} filename 文件名字
// @param {string} path 文件所在路径
// @param {string}      脚本文件内容

function getSqlContent(filename, path) {
    let content = fs.readFileSync(path, 'binary')
    sqlContentMap[filename] = content
}

// 封装所有sql脚本文件内容
// @return {object}

function getSqlContentMap() {
    let sqlMap = getSqlMap()
    for (var key in sqlMap) {
        getSqlContent(key, sqlMap[key])
    }
    return sqlContentMap
}

module.exports = getSqlContentMap