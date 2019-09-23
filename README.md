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
