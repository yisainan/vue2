use([
    "pages/user/list/listService"
], function() {
    function init(storage) {
        var app = new VueRoot({
            template: 'pages/user/list/list.html',
            data: storage,
            created: function() {},
            mounted: function() {},
            methods: {}
        });
        return app;
    }
    module.exports = init;
    if(typeof window != "undefined") {
        var mainComponent = init(storage);
        mainComponent.$mount("#automan-view");
    }
});