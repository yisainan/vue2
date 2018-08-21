//就是一个普通的node模块


//演示 打包less

//1 新建less文件
//2 下载处理less的loader
//  cnpm install less-loader less --save-dev
//3 配置webpack.config.js 
  // 配置后缀.less

//4 在app.js 中使用less文件（作为模块加载less）
//  loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'  



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
      },
      {
        test: /\.less$/,   //配置后缀名
        loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'   //loader执行的顺序从右到左
      },
      {
        test: /\.scss$/,   //配置后缀名
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'   //loader执行的顺序从右到左
      }
    ]
  }
}