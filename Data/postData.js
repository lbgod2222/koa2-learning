const Koa = require('koa')
const app = new Koa()

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
        let postData = await parsePostData(ctx)
        ctx.body = postData
    } else {
        ctx.body = `<h1>NOT FOUND</h1>`
    }
})

// 解析环境中node原生请求的POST参数
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try{
            let postdata = '';
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener('end', function(){
                let parseData = parseQueryStr(postdata)
                resolve(parseData)
            })
        } catch (err) {
            reject(err)
        }
    })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
    let queryData ={}
    let queryStrList = queryStr.split('&')
    console.log( queryStrList )
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}

app.listen(3000, () => {
    console.log("PostData is running at 3000")
})