'use strict';

module.exports = app => {
  require('./router/api')(app)           // 用户处理路由
  app.router.get('/', app.controller.importData.index); // 往数据库导入数据
  app.router.get('/home', app.controller.base.home);  // 前端项目运行
  
};
