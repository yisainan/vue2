// module.exports = (opt, app) => {
//     return async (ctx, next) => {
//         if (!ctx.session.userInfo) { // 没有登录
//             const arr = ['/v1/register', '/v1/recommend', '/v1/login', '/v1/search','/','/home','/v1/keeplogin','/v1/sendCodeMsg']
//             if (arr.includes(ctx.url) || ctx.url.includes('/classification') || ctx.url.includes('/goods/one') || ctx.url.includes('/verify')) {
//                 await next()
//                 return 
//             }
//             ctx.body = {
//                 msg: '请登录',
//                 code: -1
//             }
//         } else {
//             await next()
//         }
//     }
// }


module.exports = function (opt, app) {
    return async (ctx, next) => {
        const arr = ['/v1/register', '/v1/recommend', '/v1/login', '/v1/search', '/', '/home', '/v1/keeplogin', '/v1/sendCodeMsg']
        if (arr.includes(ctx.url) || ctx.url.includes('/classification') || ctx.url.includes('/goods/one') || ctx.url.includes('/verify')) {
            await next()    // 没有登录也能请求
        } else {
        // 获取token
        const token = ctx.header.authorization
        if (!token) {
            ctx.body = {
                msg: '请登录',
                code: '-10000'
            }
        } else {
            try {
                let payload = await app.jwt.verify(token, app.config.secret)
                if (payload.name) {
                    await next()                    
                } else {
                    ctx.status = 401;
                    ctx.body = {
                        msg: '登录过期，请重新登录',
                        code: '-10001'
                    };
                }
            } catch (error) {
                if (error.name == 'TokenExpiredError') {    // 过期
                    ctx.status = 401;
                    ctx.body = {
                        msg: '登录过期，请重新登录',
                        code: '-10001'
                    };
                }
            }
        }
    }
    }
}