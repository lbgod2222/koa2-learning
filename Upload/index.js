const Koa = require('koa')
const path = require('path')
const app = new Koa()
// const bodyParser = require('koa-bodyparser')

const { uploadFile } = require('./util/upload')
console.log(uploadFile)

// app.use(bodyParser())

app.use(async(ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        // 当GET时返回首页
        let html = `
        <h1>Koa2 upload demo</h1>
        <form method="POST">
          <p>File to upload</p>
          <span>Picture Name</span><input name="pic" type="text" /><br/>
          <input name="file" type="file" /><br/><br/>
          <button type="submit">Confirm</button>
        </form>
        `
        ctx.body = html
    } else if (ctx.url === './upload.json' && ctx.method==='POST'){
        // 上传请求处理
        let result = {success: false}
        let serverFilePath = path.join(__dirname, 'upload-files')
        
        // 上传文件事件
        result = await uploadFile(ctx, {
            fileType: 'album',
            path: serverFilePath
        })
        ctx.body = result
    } else {
        // 否则404
        ctx.body = "<h1>Not Found</h1>"
    }
})

app.listen(3000, () => {
    console.log("Upload simple successfully running at 3000")
})