const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// load template engine
app.use(views(path.join(__dirname, './views'),{
    extension: 'ejs'
}))

app.use(async(ctx) => {
    let title = 'hello world'
    await ctx.render('index',{
        title: "Koa2 test"
    })
})

app.listen(3000, () => {
    console.log("Template is running at 3000")
})