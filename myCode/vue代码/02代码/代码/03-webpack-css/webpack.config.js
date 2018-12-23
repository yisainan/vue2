//就是一个普通的node模块


//演示 打包css

// 1 新建style.css
// 2 npm init   生成 package.json    记录开发依赖
// 3 cnpm install css-loader style-loader --save-dev 
//  --save-dev  保存开发依赖
// 4 配置webpack.config.js 


//自动处理css的前缀

// 1 先在style.css中添加 有兼容性问题的样式
// 2 下载autoprefixer-loader
// 3 配置webpack.config.js



module.exports = {
  entry: './app.js',   //打包的入口文件
  //设置打包以后的文件存储的位置
  output: {
    path: './bin', //打包文件存储的目录
    filename: 'build.js'   //打包的文件名
  },
  module: {
    loaders: [
      {
        test: /\.css$/,   //配置后缀名
        //css-loader   处理样式文件中的url()  
        //style-loader  作用 是吧css代码，插入到网页中 style
        loader: 'style-loader!css-loader!autoprefixer-loader'   //loader执行的顺序从右到左
      }
    ]
  }
}