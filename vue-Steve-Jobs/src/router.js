import Vue from 'vue'

import comm from './common/comm'
import VueRouter from "vue-router"
Vue.use(VueRouter);

var router = new VueRouter({
    routes: [
        {
            name: "登陆",
            path: '/Login',
            component: require("./login/登陆")
        },
        {
            name: "注册",
            path: '/register',
            component: require("./login/注册")
        },

        {
            path: '/',
            component: require("./view/main"),
            children: [
                //智慧颂
                {
                    name: "",
                    path: '',
                    component: require("./view/首页")
                },
                {
                    name: "智慧颂",
                    path: 'Praise',
                    component: require("./智慧颂/首页")
                },
                
                {
                    name: "乔布斯传",
                    path: 'Praise/Story1/',
                    component: require("./智慧颂/智慧颂列表")
                },  //xlz新添加一个页面
                {
                    name: "那些故事",
                    path: 'Praise/Story/',
                    component: require("./智慧颂/列表")
                },
                {
                    name: "有些经典",
                    path: 'Praise/Classic/',
                    component: require("./智慧颂/列表")
                },
                {
                    path: 'Praise/Story/youdao',
                    component: require("./智慧颂/有道内容页")
                },
                {
                    path: 'Praise/Story1/:id',
                    component: require("./智慧颂/内容页")
                },
                {
                    path: 'Praise/Story/:id',
                    component: require("./智慧颂/内容页")
                },
                {
                    path: 'Praise/Classic/:id',
                    component: require("./智慧颂/视频页")
                },
                //盟友道
                {
                    name: "盟友道",
                    path: 'Bssay',
                    component: require("./盟友道/首页")
                },
                {
                    name: "朋友和朋友",
                    path: 'Bssay/Friend',
                    component: require("./盟友道/朋友")
                },
                {
                    name: "密码私享会",
                    path: 'Bssay/passShare',
                    component: require("./盟友道/密码分享")
                },
                {
                    name: "报名方式", //二维码
                    path: 'Bssay/EntryMode',
                    component: require("./盟友道/报名方式")
                },
                //              {
                //                  name: "报名方式1", //二维码
                //                  path: 'Bssay/Entryer',
                //                  component: require("./盟友道/报名方式1")
                //              },


                {
                    name: "生活马拉松",
                    path: 'Bssay/lifeMalaList',
                    component: require("./盟友道/马拉松列表")
                },
                //个人中心
                {
                    name: "个人中心",
                    path: '/my',
                    component: require("./个人中心/首页")
                },
                {
                    name: "完善资料",
                    path: '/my/userinfo',
                    component: require("./个人中心/完善资料")
                },
                //{
                //    name:"修改资料",
                //    path: '/my/modefication',
                //    component: require("./个人中心/修改资料")
                //},

                {
                    name: "我的订单",
                    path: '/my/order/:tab',
                    component: require("./个人中心/订单列表")
                },
                {
                    name: "联系我们",
                    path: '/my/ContactUs',
                    component: require("./个人中心/联系我们")
                },
                {
                    name: "推荐返成",
                    path: '/my/tjfc',
                    component: require("./个人中心/推荐返成")
                },
                {
                    name: "我的积分",
                    path: '/my/integral',
                    component: require("./个人中心/我的积分")
                },
                {
                    name: "我的财富",
                    path: '/my/wealth',
                    component: require("./个人中心/我的财富")
                },
                //{
                //    name:"每日签到",
                //    path: '/my/setsign',
                //    component: require("./个人中心/签到")
                //},
                {
                    name: "充值",
                    path: '/my/Recharge',
                    component: require("./个人中心/充值")
                },
                {
                    name: "提现",
                    path: '/my/tixian',
                    component: require("./个人中心/提现")
                },
                {
                    name: "查看物流",
                    path: '/my/logistics/:id',
                    component: require("./个人中心/查看物流")
                },
                {
                    name: "提现银行",
                    path: '/my/tixian1',
                    component: require("./个人中心/提现银行")
                },
                {
                    name: "添加银行卡",
                    path: '/my/addcard',
                    component: require("./个人中心/添加银行卡")
                },
                {
                    name: "验证码",
                    path: '/my/verify',
                    component: require("./个人中心/验证码")
                },
                //异类圈
                {
                    name: "异类圈",
                    path: '/Alien',
                    component: require("./view/异类圈")
                },
            ]
        },
        //智盟+
        {
            path: '/Bshome',
            component: require("./view/bsj"),
            children: [
                {
                    name: "智盟+",
                    path: '',
                    component: require("./智盟+/首页")
                },
                {
                    name: "推荐",
                    path: '/Bshome/recommend',
                    component: require("./智盟+/推荐")
                },
                {
                    name: "心头好",
                    path: '/Bshome/heartGood',
                    component: require("./智盟+/心头好")
                },
            ]
        },
        {
            name: "商品详情",
            path: '/Bshome/details:uid/:id',
            component: require("./智盟+/商品详情")
        },
        {
            name: "确认订单",
            path: '/Bshome/comfirmorder',
            component: require("./智盟+/确认订单")
        },
        {
            name: "收货地址",
            path: '/Bshome/ReceiptAddress',
            component: require("./智盟+/收货地址")
        },
        {
            path: '/Bshome/ReceiptAddress/:id',
            component: require("./智盟+/编辑收货地址")
        },
        {
            name: "支付完成",
            path: '/Bshome/Success/:id',
            component: require("./智盟+/支付成功")
        },
        {
            name: "购物车",
            path: '/my/ShoppingCart',
            component: require("./个人中心/购物车")
        },
        {
            name: "订单评论",
            path: '/my/Orderreview/:id',
            component: require("./个人中心/订单评论")
        },
        {
            name: "申请退款",
            path: '/my/refund:id',
            component: require("./个人中心/申请退款")
        },
        {
            name: "付款",
            path: '/my/pay/:id',
            component: require("./个人中心/付款")
        },
        {
            name: "结算",
            path: '/my/Settlement/:id',
            component: require("./个人中心/确认订单")
        },
        //微众筹
        {
            name: "微众筹",
            path: '/CrowdFunding',
            component: require("./众筹/首页")
        },
        {
            path: '/CrowdFunding/details:id',
            component: require("./众筹/众筹详情")
        },
        {
            name: "发布众筹成功",
            path: '/CrowdFunding/postSuccess',
            component: require("./众筹/发布成功")
        },
        {
            name: "发布项目",
            path: '/CrowdFunding/post:id',
            component: require("./众筹/发布项目")
        },
        {
            name: "添加回报方式",
            path: '/CrowdFunding/addReturn:index',
            component: require("./众筹/添加回报方式")
        },

        {
            name: "支持众筹",
            path: '/CrowdFunding/Pay:id',
            component: require("./众筹/支持众筹")
        },
        {
            name: "我的众筹",
            path: '/CrowdFunding/Mycrowd',
            component: require("./众筹/我的众筹")
        },
        {
            name: "众筹消息",
            path: '/CrowdFunding/message',
            component: require("./众筹/众筹消息")
        },
        {
            name: "TA的众筹",
            path: '/CrowdFunding/Mycrowd:uid/:id',
            component: require("./众筹/TA的众筹")
        },
        //放在这里就没有下面的布斯三tab

        //盟友道
        {
            name: "报名方式1", //二维码
            path: '/Bssay/Entryer',
            component: require("./盟友道/报名方式1")
        },
        {
            name: "报名海报",  //
            path: '/Bssay/Entryreport',
            component: require("./盟友道/报名海报")
        },

        {
            name: "立即报名",
            path: '/Bssay/Nowreport',
            component: require("./盟友道/立即报名")
        },
        {
            name: "填写报名信息",
            path: '/Bssay/fillreport',
            component: require("./盟友道/填写报名信息")
        },


        // {
        //     name: "分享给朋友",
        //     path: '/CrowdFunding/share:id',
        //     component: require("./众筹/分享")
        // },
        // {
        //     name: "我的代言",
        //     path: '/CrowdFunding:uid/Myrepresent:id',
        //     component: require("./微众筹/我的代言")
        // },
        // {
        //     name: "代言海报",
        //     path: '/CrowdFunding:uid/posters:id',
        //     component: require("./微众筹/海报")
        // },
        // {
        //     name: "发布项目",
        //     path: '/CrowdFunding/post:id',
        //     component: require("./微众筹/发布项目")
        // },
        // {
        //     name: "支持众筹",
        //     path: '/CrowdFunding/Pay:id',
        //     component: require("./微众筹/支持众筹")
        // },
        // {
        //     name: "分享给朋友",
        //     path: '/CrowdFunding:uid/share:id',
        //     component: require("./微众筹/分享")
        // },
        //新众筹



        //test
        {
            name: "test",
            path: '/test/',
            component: require("./test/1.vue")
        },

        //{
        //    name:"结算",
        //    path: '/balance',
        //    component: require("./view/结算")
        //},
        //{
        //    path: '/user/:id', component: User,
        //    children: [
        //      // 当 /user/:id 匹配成功，
        //      // UserHome 会被渲染在 User 的 <router-view> 中
        //      { path: '', component: UserHome },

        //      // ...其他子路由
        //    ]
        //},
        //{ path: '/user/:id', component: User }    
        //{//重定向
        //    path: '/',
        //    redirect:"/home"
        //}
    ]
});

router.beforeEach((to, from, next) => {
    comm.updateTitle(to.name)
    //if(to.name)document.title=to.name; 
    //if(mui.os.ios&&!config.dev){
    //    setTimeout(function(){
    //        var iframe = document.createElement('iframe');
    //        iframe.style.visibility = 'hidden';
    //        iframe.style.display = 'none';
    //        iframe.src="./favicon.ico";
    //        iframe.onload = function () {
    //            setTimeout(function () {
    //                document.body.removeChild(iframe);
    //            }, 0);
    //        };
    //        document.body.appendChild(iframe);
    //    },0);
    //}
    next();
});
export default router;