// 简单ws实例：$ node app-hello.js

/**
 * 创建一个WebSocket的服务器实例
 * 服务端
 **/
// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:在3000端口上打开了一个WebSocket Server
const wss = new WebSocketServer({
    port: 3000
});

// WebSocket请求接入，wss对象可以响应connection事件来处理这个WebSocket
wss.on('connection', function (ws) {
    // 在connection事件中，回调函数会传入一个WebSocket的实例，表示这个WebSocket连接
    console.log(`[SERVER] connection()`);
    // 通过响应message事件，在收到消息后再返回一个ECHO: xxx的消息给客户端。
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    })
});

/**
 * 创建WebSocket连接
 * 操作：直接在谷歌浏览器控制台输入一下代码
 * 测试：浏览器中是否成功地收到了服务器发送的消息
 **/
// 打开一个WebSocket:
// var ws = new WebSocket('ws://localhost:3000/test');
// // 响应onmessage事件:
// ws.onmessage = function(msg) { console.log(msg); };
// // 给服务器发送一个字符串:
// ws.send('Hello!');

/**
 * ws模块既包含了服务器端，又包含了客户端
 * 可以直接用ws模块提供的WebSocket来充当客户端
 * ws的WebSocket就表示客户端，它其实就是WebSocketServer响应connection事件时回调函数传入的变量ws的类型
 * 客户端
 */
let ws = new WebSocket('ws://localhost:3000/test');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', function () {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

// 响应收到的消息:
ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
})
