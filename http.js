'use strict';

// (1) http 服务器
// 导入http模块:
var http = require('http');

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');

// (2)文件服务器: 解析request.url中的路径，然后在本地找到对应的文件，把文件内容发送出去
// 解析URL需要用到Node.js提供的url模块，通过parse()将一个字符串解析为一个Url对象
var url = require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

// 处理本地文件目录需要使用Node.js提供的path模块
var path = require('path');
// 解析当前目录:
var workDir = path.resolve('.'); // 'E:\local\nodejs-study'
// 组合完整的文件路径:当前目录+'pub'+'index.html':
var filePath = path.join(workDir, 'pub', 'index.html');
// 'E:\local\nodejs-study\pub\index.html'
console.log(filePath)