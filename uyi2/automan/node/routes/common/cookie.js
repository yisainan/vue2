var Cookie = {
    getCurrentLanguage: function(req) {
        return "zh-CN";
    },
    get: function(req, key) {
        var cookie = req.headers ?  req.headers.cookie : "";
        if(cookie) {
            cookie = cookie.split(";");
            for(var index = 0; index < cookie.length; index++) {
                var k = cookie[index].split("=")[0];
                var v = cookie[index].split("=")[1];
                if(k.replace(/(^\s*)|(\s*$)/g, "") == key) {
                    return v;
                }
            }
        } else {
            return "";
        }
    }
}
module.exports = Cookie;