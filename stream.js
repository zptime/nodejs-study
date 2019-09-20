'use strict';

var fs = require('fs');

// (1)从文件流读取文本内容
// 打开一个流:
var rs = fs.createReadStream('./test/sample.txt', 'utf-8');

// data事件可能会有多次，每次传递的chunk是流的一部分数据
rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});

// (2) 以流的形式写入文件
var ws1 = fs.createWriteStream('./test/output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('./test/output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();

// (3) pipe: 一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe。
var rs = fs.createReadStream('./test/sample.txt');
var ws = fs.createWriteStream('./test/copied.txt');

rs.pipe(ws);
// 默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果不希望自动关闭Writable流，需要传入参数：
// readable.pipe(ws, { end: false });