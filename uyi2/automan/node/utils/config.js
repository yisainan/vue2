var ejs = require('ejs');
module.exports = {
    init: function() {
        app.engine('.html', ejs.__express);
        app.set('view engine', 'html');
        //app.use(express.bodyParser());
    }
}