const setItem = function (key, obj) {
    localStorage.setItem(key, escape(JSON.stringify(obj)));
};
const getItem = function (key) {
    try {
        return JSON.parse(unescape(localStorage.getItem(key)));
    } catch (e) { return null; }
};
const removeItem = function (key) { localStorage.removeItem(key); };
const exp = {
    set: function (m) {
        var d = new Date();
        d.setMinutes(d.getMinutes() + m);
        return d;
    },
    check: function (d) {//true过期
        if (d == undefined || d == null) return true;
        if (typeof (d) == "string") d = new Date(d);
        return d <= new Date();
    }
};
const cache = {
    get: function (key) {
        var k = "Cache$" + key;
        var db = getItem(k);
        if (db != null) {
            if (!exp.check(db._exptime)) return db.d;
            removeItem(k);
        }
        return null;
    },
    set: function (key, value, cache) {
        var k = "Cache$" + key;
        if (value == null) {
            removeItem(k);
            return;
        }
        setItem(k, { _exptime: exp.set(cache || 10), d: value });
    },
    clearExpItem: function () {
        for (var i = localStorage.length - 1; i >= 0; i--) {
            var k = localStorage.key(i);
            if (k.indexOf("Cache$") != 0) continue;
            var o = getItem(k);
            if (o && exp.check(o._exptime)) removeItem(k);
        }
    }
};
cache.clearExpItem();
export default cache