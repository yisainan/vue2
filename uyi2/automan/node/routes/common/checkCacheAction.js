var async = require("async");
var Tools = require('../common/tools');
exports.checkCacheAction = function(req, res) {
    var clientTimeStamp = req.param("clientTimeStamp");
    var isCacheTimeOut = Tools.isCacheTimeOut(clientTimeStamp);
    res.json({"result": isCacheTimeOut, "timestamp": timestamp});
}