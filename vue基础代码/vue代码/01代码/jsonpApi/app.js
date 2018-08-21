'use strict';

const express = require('express');

let app = express();

//jsonp   josn with padding      fn({})
//   http://127.0.0.1/getdata?callback=fn
app.get('/getdata', (req, res) => {
  let callback = req.query.callback;

  //模拟从数据库中获取的数据
  let data = {name: 'zs', age: 18};

  //  fn({})
  res.send(callback + '('+ JSON.stringify(data) +')' );

})


app.listen(1234, () => {
  console.log('正在监听：1234')
});