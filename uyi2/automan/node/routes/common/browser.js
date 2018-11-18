exports.browser = {
    getPageTplPath: function(currentPath, pageName) {
        var paths = currentPath.split("routes");
        var pageTplPath = paths[1];
        return browserPath + "/pages" + pageTplPath + "/" + pageName + ".html";
    }
}