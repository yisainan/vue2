var async = require("async");
var fs = require("fs");
var browser = require(routesPath + "/common/browser").browser;
var renderEngin = require(routesPath + "/common/renderEngin");
exports.detail = function(req, res) {
    use(["pages/user/detail/detail", "pages/user/detail/detailService"], function(app, detailService) {
        var storage = {};
        renderEngin.call(res, "user/detail", app, browser.getPageTplPath(__dirname, "detail"), storage);
    },"user/detail");
}