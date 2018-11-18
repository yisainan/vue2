var fs = require("fs");
cluster = require('cluster');
var numCPUs = require('os').cpus().length;
global.app = require("./node/utils/utils").conf.init().app;
port = 8007;
app.watch(port);
console.log("server start at " + port);
process.on('uncaughtException', function (err) {
    console.log(err);
});
