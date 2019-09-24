module.exports = {
    // 同一处理错误
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    // 如何统一输出REST
    restify: (pathPrefix) => {
        // REST API前缀，默认为/api/:
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            // 是否是REST API前缀?
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 绑定rest()方法:
                console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
                ctx.rest = (data) => {
                    // 设置Content-Type:
                    ctx.response.type = 'application/json';
                    // 设置Response Body:
                    // 在koa中，只需要给ctx.response.body赋值一个JavaScript对象，koa会自动把该对象序列化为JSON并输出到客户端
                    ctx.response.body = data;
                }
                try {
                    await next();
                } catch (e) {
                    // 返回错误:
                    console.log('Process API error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        // 遇到非APIError的错误时，自动转换错误码为internal:unknown_error
                        code: e.code || 'internal:unknown_error',
                        message: e.message || ''
                    };
                }
            } else {
                await next();
            }
        };
    }
};