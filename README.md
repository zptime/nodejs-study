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
