const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '6671303',
    database: 'koa_test'
})

// 执行脚本的读写
connection.query('SELECT * FROM koa_test1', (err, results, fields) => {
    if (err) {
        throw err
    }
    // if successful connected:

    // dismiss connection
    connection.release()
});

// 在数据池中进行会话操作 不用重新配置链接参数
connection.getConnection(function(err, connection) {
    connection.query('SELECT * FROM koa_test1', (err, results, fields) => {
        if (err) {
            throw err
        }
        // if successful connected:
    
        // dismiss connection
        connection.release()
    });
})