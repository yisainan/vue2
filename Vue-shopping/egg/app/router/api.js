// 前端api接口相关路由
module.exports = app => {
    const { router, controller } = app;
    router.get('/v1/verify', app.controller.base.verify);           //验证码
    router.post('/v1/sendCodeMsg', app.controller.api.user.sendCodeMsg);//短信验证码
    router.post('/v1/register', controller.api.user.register);     // 用户注册
    router.post('/v1/login', controller.api.user.login);           // 用户登录
    router.post('/v1/queryUser', controller.api.user.queryUser);   // 查询单个用户
    router.post('/v1/saveUser', controller.api.user.saveUser);     // 单个用户资料修改保存
    router.post('/v1/keeplogin', controller.api.user.keepLogin);   // 保持登录
    router.post('/v1/loginOut', controller.api.user.loginOut);     // 退出登录
    router.get('/v1/getAddress', controller.api.user.getAddress);  // 查询收货地址
    router.get('/v1/getDefaultAddress', controller.api.user.getDefaultAddress);     // 查询默认收货地址
    router.post('/v1/setDefaultAddress', controller.api.user.setDefaultAddress);     // 设置默认收货地址
    router.post('/v1/isCollection', controller.api.user.isCollection);        // 查询是否已收藏
    router.post('/v1/getCard', controller.api.user.getCard);                  // 查询是购物车
    router.get('/v1/myOrder', controller.api.user.myOrder);                   // 查询用户订单
    router.get('/v1/myOrder/orderNum', controller.api.user.orderNum);         // 查询用户订单数量
    router.get('/v1/collection/list', controller.api.user.collectionList);    // 查询收藏的商品
    router.get('/v1/alreadyEvaluated', controller.api.user.alreadyEvaluated);     // 查询已评价的商品商品列表
    router.get('/v1/tobeEvaluated', controller.api.user.tobeEvaluated);     // 查询待评价的商品商品列表
    router.post('/v1/evaluateOne',controller.api.user.evaluateOne)             // 查询单条评价

    // 商品展示相关
    router.get('/v1/recommend', controller.api.goods.recommend);               // 首页商品展示
    router.get('/v1/classification', controller.api.goods.classification);     // 商品分类查询
    router.get('/v1/goods/one', controller.api.goods.goodsOne);                // 单个商品查询
    router.post('/v1/search', controller.api.goods.search);                    // 搜索

    // 商品操作相关
    router.post('/v1/collection', controller.api.operatingGoods.collection);               // 收藏商品
    router.post('/v1/cancelCollection', controller.api.operatingGoods.cancelCollection);   // 取消收藏商品
    router.post('/v1/addShop', controller.api.operatingGoods.addShop);                     // 加入购物车
    router.post('/v1/editCart', controller.api.operatingGoods.editCart);                   // 购物车增加减少
    router.post('/v1/deleteShop', controller.api.operatingGoods.deleteShop);               // 购物车删除
    router.post('/v1/address', controller.api.operatingGoods.address);                     // 保存收货地址
    router.post('/v1/deleteAddress', controller.api.operatingGoods.deleteAddress);         // 删除单条收货地址
    router.post('/v1/order', controller.api.operatingGoods.order);                         // 接受订单
    router.post('/v1/goodsOne/comment', controller.api.operatingGoods.comment);            // 商品评论

}