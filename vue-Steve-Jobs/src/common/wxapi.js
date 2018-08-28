import api from "./api";
var init = function (apis, back) {
    api("WechatShare/share", { url: (location + '').replace(/#.+/, "") }).then(db => {
        var config = {
            debug: false,
            jsApiList: apis,
            ...db
        };
        wx.config(config);
        wx.ready(() => {
            back(config);
        });
    });
}
export default {
    hideMenuItems() {
        init(['hideMenuItems',
            'hideOptionMenu'
        ], wx.hideOptionMenu)
    },
    showMenuItems(title, imgUrl, spid, uid, type = 4) {
        init(["onMenuShareTimeline",
            "showAllNonBaseMenuItem",
            "onMenuShareAppMessage"
        ], (cf) => {
            //appid config
            //state=4@商品id@会员id
            //
            var link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + cf.appId + "&redirect_uri=http%3A%2F%2Fybswx.yunliplus.com%2Findex.php%2FLogin%2Flogin&response_type=code&scope=snsapi_base&state=" + type + "@" + spid + "@" + uid + "#wechat_redirect"
            var config = {
                title,// 分享标题
                link, // 分享链接
                imgUrl: imgUrl || "", // 分享图标
                success: function () {
                    mui.toast("分享成功")
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            };
            //wx.showAllNonBaseMenuItem();
            wx.onMenuShareTimeline(config);
            wx.onMenuShareAppMessage({
                title, // 分享标题
                desc: title, // 分享描述
                link, // 分享链接
                imgUrl,
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    mui.toast("分享成功")
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        })
    },
    pay(money, type) {//金额:元      类型 (1:单个订单 2:购物车的 3:微众筹 4:充值,5)
        var uname = localStorage.getItem("uname");
        var url = location.toString().replace(/wap.+/, "index.php/Pay/index");
        var redirect_uri = "http://pay.laikeduo.com/zmwxpay/getopid.php";//获取openid 页面由平台提供商户可以无视
        var data = money;
        data += "|" + url;//此字符串由  金额|支付确认页面地址|订单标题|订单备注  组成 顺序不要颠倒
        data += "|" + uname;
        data += "|" + uname;
        data += "|" + type;
        var appid = "wx9eb283c435defe51";
        var redirect_uri = encodeURI(redirect_uri);
        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_base&state=" + data;
        var str = "https://open.weixin.qq.com/connect/oauth2/authorize?";
        str += ("appid=" + appid);
        str += ("&redirect_uri=" + redirect_uri);
        str += "&response_type=code";
        str += "&scope=snsapi_base";
        str += "&state=" + data;
        str += "#wechat_redirect";
        location.href = str;
    }
}