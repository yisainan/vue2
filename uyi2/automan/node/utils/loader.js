/**
 * 从缓存中移除module
 */
function purgeCache(moduleName) {
    // 遍历缓存来找到通过指定模块名载入的文件
    searchCache(moduleName, function (mod) {
        delete require.cache[mod.id];
    });

    // 删除模块缓存的路径
    // 多谢@bentael指出这点
    Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
        if (cacheKey.indexOf(moduleName)>0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};

/**
 * 遍历缓存来查找通过特定模块名缓存下的模块
 */
function searchCache(moduleName, callback) {
    //  通过指定的名字resolve模块
    var mod = require.resolve(moduleName);

    // 检查该模块在缓存中是否被resolved并且被发现
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        // 递归的检查结果
        (function traverse(mod) {
            // 检查该模块的子模块并遍历它们
            mod.children.forEach(function (child) {
                traverse(child);
            });

            // 调用指定的callback方法，并将缓存的module当做参数传入
            callback(mod);
        }(mod));
    }
};
global.useNum = 0;//每个页面分析use次数计数
var currentPageName = "";
function dealPath(pathArray) {
    for(var index = 0; index < pathArray.length; index++) {
        var path = pathArray[index];
        var paths = path.split("/");
        var firstPathLabel = paths[0];
        if(pathMap[firstPathLabel]) {
            paths[0] = pathMap[firstPathLabel];
            pathArray[index] = paths.join("/");
        }
        if(pathArray[index].indexOf(".js")== -1) {
            pathArray[index] += ".js";
        }
    }
}
exports.loader = {
    use: function() {
        return function(pathArray, callback, pageName) {
            dealPath(pathArray);
            if (pageName) {
                if (!pageTocommonComponent[pageName]) {
                    pageTocommonComponent[pageName] = [];
                }
                currentPageName = pageName;
            }
            var classArray = [];
            for (var index = 0; index < pathArray.length; index++) {
                var path = pathArray[index];
                if(path.lastIndexOf(".css") > -1) {
                    continue;
                }
                if(path.indexOf("node_modules/") > -1) {
                    continue;
                }
                purgeCache(browserPath + "/" + pathArray[index]);
                var classObj = require(browserPath + "/" + pathArray[index]);
                if (pathArray[index].indexOf("/components/common/") > -1) {
                    var flag = false;
                    for (var i = 0; i < pageTocommonComponent[currentPageName].length; i++) {
                        if (pageTocommonComponent[currentPageName][i] == pathArray[index]) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        pageTocommonComponent[currentPageName].push(pathArray[index].substring(pathArray[index].lastIndexOf("/") + 1, pathArray[index].lastIndexOf(".")));
                    }
                }
                classPool[path] = classObj;
                classArray.push(classObj);
            }
            if (pageName) {
                useCount[pageName] = useNum;
                useNum = 0;
            } else if (!pageName) {
                useNum++;

            }
            callback.apply(null, classArray);
        }
    }

}
