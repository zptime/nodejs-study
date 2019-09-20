// koa 1.0
var koa = require('koa');
var app = koa();

app.use('/test', function *() {
    yield doReadFile1();
    var data = yield doReadFile2();
    this.body = data;
});

app.listen(3000);

// koa2
app.use(async (ctx, next) => {
    await next();
    var data = await doReadFile();
    ctx.response.type = 'text/plain';
    ctx.response.body = data;
});

// ES7 async/await Promise解决异步
// async和await，可以轻松地把一个function变为异步模式：
async function doReadFile1() {
    var data = await fs.read('/file1');
    console.log(data)
}