//就是一个普通的node模块

module.exports = {
  entry: './app.js',   //打包的入口文件
  //设置打包以后的文件存储的位置
  output: {
    path: './bin', //打包文件存储的目录
    filename: 'build.js'   //打包的文件名
  }
}