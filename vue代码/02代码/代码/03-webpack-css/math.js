//自己实现的模块

function add(a, b) {
  return (a - 0) + (b - 0);
}

function sub(a, b) {
  return (a - 0) - (b - 0);
}


// module.exports = {
//   add: add,
//   sub: sub
// }

//导出模块  模块对象具有两个方法 add,  sub
module.exports = {
  add,
  sub
}