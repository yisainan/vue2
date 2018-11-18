var proxy = require("./proxy");
var fs = require("fs");
module.exports = {
    initRoute: function() {
        app.watch = function(port) {
            var watchString = fs.readFileSync("node/routes/watch.json").toString();
            var watchJson = JSON.parse(watchString);
            var requestList = watchJson.request;
            global.routeList = requestList;
            for(var index = 0; index < requestList.length; index++) {
                var page = require(requestList[index].url);
                var requestName = requestList[index].requestName;
                var routeAction = page[requestName];
                (function(routeAction, requestName, requestList, index, page) {
                    page[requestName] = function(req, res) {//拦截请求
                        req.params = Object.assign({}, req.query);
                        if(requestList[index].isLogin) {
                            var self = this;
                            require("../routes/common/login").checkLogin(req, res, function() {
                                routeAction.call(self, req, res);
                            });
                        } else {
                            routeAction.call(this, req, res);
                        }
                    }
                    app[requestList[index].type](requestList[index].route, page[requestName]);
                })(routeAction, requestName, requestList, index, page);
            }
            proxy.initProxy();
            app.listen(port);
        }
    }
}