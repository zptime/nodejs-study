# nodejs学习

## 参考网址

* [廖雪峰的官方文档](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025235359040)
* [7天学会nodejs](https://nqdeng.github.io/7-days-nodejs/)
* [nodejs中文文档](https://www.nodeapp.cn)
* [node实战实例](http://www.codeceo.com/article/10-best-nodejs-tutorials-demo.html)
* [node.js+express+mongodb 小电商项目实战](https://www.ctolib.com/18820227745-shop-demo-node.html)
* [Node.js经典项目实战](https://www.shiyanlou.com/courses/455)

## 基础知识

* 作者：Ryan Dahl
* nodejs：基于JavaScript语言和V8引擎的开源Web服务器项目，Node第一次把JavaScript带入到后端服务器开发
* 优势：借助JavaScript天生的事件驱动机制加V8高性能引擎，使编写高性能Web服务轻而易举；JavaScript语言本身是完善的函数式语言，在Node环境下，通过模块化的JavaScript代码，加上函数式编程，并且无需考虑浏览器兼容性问题，直接使用最新的ECMAScript 6标准，可以完全满足工程上的需求
* 版本：node(v10.16.2) npm(6.11.3) yarn(1.16.0)
* npm：Node.js的包管理工具（package manager）

## 基础命令

* 进入Node.js的交互环境：$ node
* 退出Node.js环境：连按两次Ctrl+C
* 使用严格模式：node --use_strict calc.js 或者在js文件头部加上'use strict'

## 模块化

* commonJS规范：require('module_name') 引用模块；module.exports = variable 对外暴露

## 基本模板

> Node.js是运行在服务区端的JavaScript环境，服务器程序和浏览器程序相比，最大的特点是没有浏览器的安全限制了，而且，服务器程序必须能接收网络请求，读写文件，处理二进制内容，所以，Node.js内置的常用模块就是为了实现基本的服务器功能。这些模块在浏览器环境中是无法被执行的，因为它们的底层代码是用C/C++在Node.js运行环境中实现的。

* global：JavaScript有且仅有一个全局对象，在浏览器中，叫window对象。而在Node.js环境中，也有唯一的全局对象global，这个对象的属性和方法和浏览器环境的window不同。
* process：代表当前Node.js进程。通过process对象可以拿到许多有用信息，如process.version, platform, arch, cdw()(返回当前工作目录), nextTick()等等
* fs：文件系统模块，负责读写文件，和所有其它JavaScript模块不同的是，fs模块同时提供了`异步`和`同步`的方法。读文件：readFile, readFileSync(同步)；写文件：writeFile, writeFileSync；stat：获取文件大小，创建时间等信息。一般建议还是用异步。
* stream：仅在服务区端可用的模块，目的是支持“流”这种数据结构。createReadStream, createWriteStream, pipe
* http: request对象封装了HTTP请求，response对象封装了HTTP响应。
* crypto模块：提供通用的加密和哈希算法。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，方便，运行速度也快。

## koa

> Express是第一代最流行的web框架，koa是Express的下一代基于Node.js的web框架

* express：基于ES5的语法，要实现异步代码，只有一个方法：回调。如异步嵌套层数过多时，代码比较难看
* koa 1.0：随着新版Node.js开始支持ES6，Express的团队又基于ES6的generator重新编写了下一代web框架koa。和Express相比，koa 1.0使用`generator`(* yield)实现异步
* koa2：基于ES7(async/await)开发了koa2，和koa 1相比，koa2完全使用Promise并配合async来实现异步
* koa MVC框架：Nunjucks(模板引擎), koa-router(路由), controller(控制器)

## mysql

* [下载地址](https://dev.mysql.com/downloads/mysql/)
* [参考文档](https://www.jianshu.com/p/689f25071ba5)
* 初始化配置：`mysqld --initialize --console` 获取初始化密码
* 安装：`mysqld install`
* 启动：`net start mysql`
* 登录数据库：`mysql -u root -p`
* 更改密码：`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';`
* 测试连接数据库：`show databases`
* 停止服务：`net stop mysql`

## mocha

* 单元测试是用来对一个模块、一个函数或者一个类来进行正确性检验的测试工作。
* mocha是JavaScript的一种单元测试框架，既可以在浏览器环境下运行，也可以在Node.js环境下运行。
* 使用mocha，我们就只需要专注于编写单元测试本身，然后，让mocha去自动运行所有的测试，并给出测试结果。
* mocha的特点主要有：
  1. 既可以测试简单的JavaScript函数，又可以测试异步代码，因为异步是JavaScript的特性之一；
  2. 可以自动运行所有测试，也可以只运行特定的测试；
  3. 可以支持before、after、beforeEach和afterEach来编写初始化代码。

## WebSocket

> WebSocket是HTML5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道(无限制的全双工通信)，任何一方都可以主动发消息给对方。

* 为什么传统的HTTP协议不能做到WebSocket实现的功能？
  1. 这是因为HTTP协议是一个请求－响应协议，请求必须先由浏览器发给服务器，服务器才能响应这个请求，再把数据发送给浏览器。换句话说，浏览器不主动请求，服务器是没法主动发数据给浏览器的。
  2. 轮询是指浏览器通过JavaScript启动一个定时器，然后以固定的间隔给服务器发请求，询问服务器有没有新消息。这个机制的缺点一是实时性不够，二是频繁的请求会给服务器带来极大的压力。
  3. Comet本质上也是轮询，但是在没有消息的情况下，服务器先拖一段时间，等到有消息了再回复。这个机制暂时地解决了实时性问题，但是它带来了新的问题：以多线程模式运行的服务器会让大部分线程大部分时间都处于挂起状态，极大地浪费服务器资源。另外，一个HTTP连接在长时间没有数据传输的情况下，链路上的任何一个网关都可能关闭这个连接，而网关是我们不可控的，这就要求Comet连接必须定期发一些ping数据表示连接“正常工作”。

* WebSocket协议：
  * 首先，WebSocket连接必须由浏览器发起，因为请求协议是一个标准的HTTP请求，格式如下：
    1. GET请求的地址不是类似/path/，而是以ws://开头的地址；
    2. 请求头Upgrade: websocket和Connection: Upgrade表示这个连接将要被转换为WebSocket连接；
    3. Sec-WebSocket-Key是用于标识这个连接，并非用于加密数据；
    4. Sec-WebSocket-Version指定了WebSocket的协议版本。

    ``` bash
        GET ws://localhost:3000/ws/chat HTTP/1.1
        Host: localhost
        Upgrade: websocket
        Connection: Upgrade
        Origin: http://localhost:3000
        Sec-WebSocket-Key: client-random-string
        Sec-WebSocket-Version: 13
    ```

  * 随后，服务器如果接受该请求，就会返回如下响应：
    1. 该响应代码101表示本次连接的HTTP协议即将被更改，更改后的协议就是Upgrade: websocket指定的WebSocket协议。

  ``` bash
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: server-random-string
  ```

* 同源策略：WebSocket协议本身不要求同源策略（Same-origin Policy），也就是某个地址为`http://a.com`的网页可以通过WebSocket连接到 `ws://b.com`。但是，浏览器会发送Origin的HTTP头给服务器，服务器可以根据Origin拒绝这个WebSocket请求。所以，是否要求同源要看服务器端如何检查。

* 路由：服务器在响应connection事件时并未检查请求的路径，因此，在客户端打开ws://localhost:3000/any/path可以写任意的路径。实际应用中还需要根据不同的路径实现不同的功能。

* package.json为最新版本时，根本跑不起来，只能退回到课程实例版本。版本更新后，相关属性有了差异。
  * app.js     109行 ws.upgradeReq.url     Cannot read property 'url' of undefined
  * app.js     160行 this.wss.clients.map  TypeError: this.wss.clients.map is not a function

## REST

> REST（Representational State Transfer）：REST就是一种设计API的模式。最常用的数据格式是JSON。由于JSON能直接被JavaScript读取，所以，以JSON格式编写的REST风格的API具有简单、易读、易用的特点。

* Web API：如果一个URL返回的不是HTML，而是机器能直接解析的数据，这个URL就可以看成是一个Web API。
* 编写API的好处：由于API就是把Web App的功能全部封装了，所以，通过API操作数据，可以极大地把前端和后端的代码隔离，使得后端代码易于测试，前端代码编写更简单。
* REST API规范：编写REST API，实际上就是编写处理HTTP请求的async函数
  1. REST请求仍然是标准的HTTP请求，但是，除了GET请求外，POST、PUT等请求的body是JSON数据格式，请求的Content-Type为application/json；
  2. EST响应返回的结果是JSON数据格式，因此，响应的Content-Type也是application/json。
* curl：cURL是一个利用URL语法在命令行下工作的文件传输工具。它支持文件上传和下载，所以是综合传输工具，但按传统，习惯称cURL为下载工具。cURL还包含了用于程序开发的libcurl。
  * [windows（64位）下使用curl命令](https://www.cnblogs.com/xing901022/p/4652624.html)
    * 注意：其中方式三无效。
    * 注意：在Windows中curl命令后面用双引号。
    * curl -H 'Content-Type: application/json' -X POST --data '{"name":"XBox","price":3999}' http://localhost:3000/api/products  (错误：curl: (6) Could not resolve host: application  结果：插入一个空对象{}  原因：6-无法解析主机地址  解决：改为127.0.0.1或者ip地址，均无效；改为双引号报错。 )
    * curl -H "Content-Type: application/json" -X POST -d "{'name':'XBox','price':3999}" http://localhost:3000/api/products  (报错：Bad Request)

## MVVM

* 前端发展历史
  * 静态网页：预先编写好的存放在Web服务器上的html文件。浏览器请求某个URL时，Web服务器把对应的html文件扔给浏览器，就可以显示html文件的内容了。
  * 动态HTML文件：服务器针对不同的用户，动态生成不同的html文件，显示不同的页面。
    * CGI(Common Gateway Interface)：利用C、C++这些编程语言，直接向浏览器输出拼接后的字符串。
    * ASP、JSP和PHP——分别由微软、SUN和开源社区开发。例如，在ASP中，一个asp文件就是一个HTML，但是，需要替换的变量用特殊的<%=var%>标记出来了，再配合循环、条件判断，创建动态HTML就比CGI要容易得多。
  * 1995年年底，JavaScript被引入到浏览器，修改HTML页面的内容。
    * 第一阶段，直接用JavaScript操作DOM节点，使用浏览器提供的原生API
    * 第二阶段，由于原生API不好用，还要考虑浏览器兼容性，jQuery横空出世
    * 第三阶段，MVC模式，需要服务器端配合，JavaScript可以在前端修改服务器渲染后的数据。
    * MVVM(Model–view–viewmodel)：最早由微软提出，Model负责模型，View负责视图，ViewModel负责关联Model和View，把Model的数据同步到View显示出来，还负责把View的修改同步回Model。
