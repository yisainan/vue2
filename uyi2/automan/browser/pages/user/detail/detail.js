use([
    "pages/user/detail/detailService"
], function() {
    function init(storage) {
        var app = new VueRoot({
            template: 'pages/user/detail/detail.html',
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