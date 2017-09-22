// 表结构写入
const fs = require('fs')
const getSqlContentMap = require('./util/get-sql-content-map');
const { query } = require('./util/db');


// 打印脚本执行日志
const  eventLog = function(err, sqlFile, index) {
    if (err) {
        console.log(`[错误]sql脚本文件: ${sqlFile}的第${index + 1}条脚本执行失败`)
    } else {
        console.log(`[成功]sql脚本文件: ${sqlFile}的第${index + 1}条脚本执行成功`)
    }
}

//获取所有的sql脚本内容
let sqlContentMap = getSqlContentMap()

//执行建表sql脚本
const createAllTables = async() => {
    for (let key in sqlContentMap) {
        let sqlShell = sqlContentMap[key]
        let sqlShellList = sqlShell.split(';')

        for(let [i, shell] of sqlShellList.entries()){
            if (shell.trim()) {
                let result = await query(shell)
                if (result.serverStatus * 1 === 2) {
                    eventLog(null, key, i)
                } else {
                    eventLog(true, key, i)
                }
            }
        }
    }
    console.log('sql执行结束')
}

createAllTables()