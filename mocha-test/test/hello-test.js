const assert = require('assert');
const sum = require('../hello');

// mocha默认会执行test目录下的所有测试，不要去改变默认目录。
// describe可以任意嵌套，以便把相关测试看成一组测试。
// 编写测试的原则是，一次只测一种情况，且测试代码要非常简单。编写多个测试来分别测试不同的输入，并使用assert判断输出是否是我们所期望的。
// 测试命令：npm test
describe('#hello.js', () => {
    describe('#sum()', () => {
        // 在测试前初始化资源，测试后释放资源是非常常见的。mocha提供了before、after、beforeEach和afterEach来实现这些功能。
        before(function () {
            console.log('before:');
        });

        after(function () {
            console.log('after.');
        });

        beforeEach(function () {
            console.log('  beforeEach:');
        });

        afterEach(function () {
            console.log('  afterEach.');
        });

        // 每个it("name", function() {...})就代表一个测试。例如，为了测试sum()，我们这样写：
        it('sum() should return 0', () => {
            // 使用Node.js提供的assert模块进行断言
            assert.strictEqual(sum(), 0);
        });

        it('sum(1) should return 1', () => {
            assert.strictEqual(sum(1), 1);
        });

        it('sum(1, 2) should return 3', () => {
            assert.strictEqual(sum(1, 2), 3);
        });

        it('sum(1, 2, 3) should return 6', () => {
            assert.strictEqual(sum(1, 2, 3), 6);
        });
    });
});