'use strict';

var fs = require('fs');

// (1)异步读取时，传入的回调函数接收两个参数，当正常读取时，err参数为null，data参数为读取到的String。当读取发生错误时，err参数代表一个错误对象，data为undefined。这也是Node.js标准的回调函数：第一个参数代表错误信息，第二个参数代表结果。
fs.readFile('./test/sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

// 当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象。在Node.js中，Buffer对象就是一个包含零个或任意个字节的数组（注意和Array不同）。
fs.readFile('./test/favicon.ico', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
    }
});
fs.readFile('./test/sample.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');

        // Buffer对象可以和String作转换，例如，把一个Buffer对象转换成String：
        // Buffer -> String
        // var text = data.toString('utf-8');
        // console.log(text);
        // // 或者把一个String转换成Buffer：
        // // String -> Buffer
        // var buf = Buffer.from(text, 'utf-8');
        // console.log(buf);
    }
});

// (2)同步读取文件 readFileSync try...catch捕获该错误
try {
    var data = fs.readFileSync('./test/sample.txt', 'utf-8');
    console.log(data);
} catch (err) {
    // 出错了
    console.log(err)
}

// (3)写文件
var data = 'Hello, Node.js. This is write file!';
fs.writeFile('./test/output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});

var data = 'Hello, Node.js. This is async write file';
fs.writeFileSync('./test/output.txt', data);

//如果我们要获取文件大小，创建时间等信息，可以使用fs.stat()，它返回一个Stat对象，能告诉我们文件或目录的详细信息
fs.stat('./test/sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});

var stat = fs.statSync('./test/sample.txt')
// 是否是文件:
console.log('isFile: ' + stat.isFile());
// 是否是目录:
console.log('isDirectory: ' + stat.isDirectory());
if (stat.isFile()) {
    // 文件大小:
    console.log('size: ' + stat.size);
    // 创建时间, Date对象:
    console.log('birth time: ' + stat.birthtime);
    // 修改时间, Date对象:
    console.log('modified time: ' + stat.mtime);
}