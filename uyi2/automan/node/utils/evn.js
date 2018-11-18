var fs = require("fs");
module.exports = {
    initEvn: function() {
        global.env = JSON.parse(fs.readFileSync("./evn.json"));
        global.globalConfig = JSON.parse(fs.readFileSync("config.json"));
        var param = "";
        var envConfig = null;
        if(process.argv.length > 2) {
            param = (process.argv.splice(2))[0];
        }
        if(param) {
            if(env[param]) {
                globalConfig.serverHost = env[param]["host"];
                globalConfig.serverPort = env[param]["port"];
                globalConfig.protocal = env[param]["protocal"];
            }
        }
    }
}
