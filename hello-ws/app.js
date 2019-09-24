/**
 * 基于WebSocket创建一个在线聊天室
 * 在koa2和Nunjucks创建的Web(即hello-koa)的基础上，把WebSocket添加进来。
 */
const url = require('url');

const ws = require('ws');

const Cookies = require('cookies');

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const WebSocketServer = ws.Server;

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse user from cookie:
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: true,
    watch: true
}));

// add controller middleware:
app.use(controller());

// koa app的listen()方法返回http.Server:
let server = app.listen(3000);

// 识别用户身份
function parseUser(obj) {
    if (!obj) {
        return;
    }
    console.log('try parse: ' + obj);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (e) {
            // ignore
        }
    }
}

function createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
    // 创建WebSocketServer:同一个端口，根据协议，可以分别由koa和ws处理
    let wss = new WebSocketServer({
        server: server
    });

    // 对于聊天应用来说，每收到一条消息，就需要把该消息广播到所有WebSocket连接上。
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    // 对每个创建成功的WebSocket绑定message、close、error等事件处理函数
    onConnection = onConnection || function () {
        console.log('[WebSocket] connected.');
    };
    onMessage = onMessage || function (msg) {
        console.log('[WebSocket] message received: ' + msg);
    };
    onClose = onClose || function (code, message) {
        console.log(`[WebSocket] closed: ${code} - ${message}`);
    };
    onError = onError || function (err) {
        console.log('[WebSocket] error: ' + err);
    };

    // 在WebSocketServer中，需要响应connection事件，然后识别用户
    wss.on('connection', function (ws, req) {
        // In version 3.0.0 the WebSocket.upgradeReq property has been removed. Unfortunately that means that now there's no simple way to determine on the server which URL the client originally requested. In version 2.3.1 you could do this simply using ws.upgradeReq.url where ws is the instance of the WebSocket class.
        // 在版本3.0.0中，已删除WebSocket.upgradeReq属性。不幸的是，这意味着现在没有简单的方法可以在服务器上确定客户端最初请求的URL。在2.3.1版中，您可以简单地使用ws.upgradeReq.url来执行此操作，其中ws是WebSocket类的实例。
        // ws.upgradeReq = req;  // add    解决bug：Cannot read property 'url' of undefined
        let location = url.parse(ws.upgradeReq.url, true);
        console.log('[WebSocketServer] connection: ' + location.href);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        if (location.pathname !== '/ws/chat') {
            // close ws:
            ws.close(4000, 'Invalid URL');
        }
        // check user:
        // ws.upgradeReq是一个request对象:
        let user = parseUser(ws.upgradeReq);
        if (!user) {
            // Cookie不存在或无效，直接关闭WebSocket:
            ws.close(4001, 'Invalid user');
        }
        // 识别成功，把user绑定到该WebSocket对象:
        ws.user = user;
        // 绑定WebSocketServer对象:
        ws.wss = wss;

        onConnection.apply(ws);
    });

    console.log('WebSocketServer was attached.');
    return wss;
}

// 用createMessage()创建一个JSON格式的字符串，发送给浏览器，浏览器端的JavaScript就可以直接使用：
var messageIndex = 0; // 消息ID

function createMessage(type, user, data) {
    messageIndex ++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

function onConnect() {
    let user = this.user;
    let msg = createMessage('join', user, `${user.name} joined.`);
    this.wss.broadcast(msg);
    // build user list:
    let clients = this.wss.clients
    console.log('client--start')
    console.log(clients)
    console.log(typeof clients)
    console.log('client--end')
    let users = clients.map(function (client) {
        return client.user;
    });
    this.send(createMessage('list', user, users));
}

// 在某个WebSocket收到消息后，就可以调用wss.broadcast()进行广播了：
function onMessage(message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}

function onClose() {
    let user = this.user;
    let msg = createMessage('left', user, `${user.name} is left.`);
    this.wss.broadcast(msg);
}

app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);

console.log('app started at port 3000...');
