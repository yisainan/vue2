var async = require("async");
var fs = require("fs");
var browser = require(routesPath + "/common/browser").browser;
var renderEngin = require(routesPath + "/common/renderEngin");
exports.pay = function(req, res) {
    use(["pages/jiaofei/pay/pay", "pages/jiaofei/pay/payService"], function(app, payService) {
        var storage = {};
        renderEngin.call(res, "jiaofei/pay", app, browser.getPageTplPath(__dirname, "pay"), storage);
    },"jiaofei/pay");
}