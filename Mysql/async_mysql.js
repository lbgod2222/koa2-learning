const { query } = require('./promise_mysql')
async function selectAllData() {
    let sql = 'SELECT * FROM koa_test1'
    let dataList = await query(sql)
    return dataList
}

async function getData() {
    let dataList = await selectAllData()
    console.log(dataList)
}

getData()