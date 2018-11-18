var fs = require("fs");
exports.imageAction = function(req, res) {
    var content = "";
    var extentions = {
        "gif": "image/gif",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    }
    function sendImage(content, url) {
        var extention = url.substring(url.lastIndexOf(".") + 1, url.length);
        var contentType = extentions[extention] ? extentions[extention] : "image/txt";
        var userAgen = req.headers["user-agent"];
        if (userAgen.indexOf("Firefox") > -1) {
            res.setHeader("Expires", "Sun, 17-Jan-2038 19:14:07 GMT");
            res.setHeader("Last-Modified", "Fri, 31 Oct 2009 02:14:04 GMT");
        } else {
            res.setHeader("Content-Type", contentType);
            res.setHeader("Cache-Control", "public, max-age=" + 3600000 * 24 * 30);
        }
        res.writeHead(200, "Ok");
        res.write(content, "binary"); //格式必须为 binary，否则会出错
        res.end();
    }
    var url = browserPath + "/" + req.url;
    content = cache.get(url);
    if(!content) {
        fs.readFile(url, "binary", function (error, data) {
            content = data.toString();
            cache.set(url, content);
            sendImage(content, url)
        });
    } else {
        sendImage(content, url);
    }
}