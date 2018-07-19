//就是一个普通的node模块


//演示 css中引用图片

// 1 下载url-loader
// 2 配置webpack.config   要去处理的文件类型


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
      },
      {
        //设置处理不同类型的文件
        test: /\.(jpg|gif|png|eot|svg|ttf|woff|otf)$/,
        loader: 'url-loader?limit=90000'  

        //loader: 'url-loader?limit=20480'  
        // limit 单位 字节 
        //limit的作用，如果图片小于 20480 图片会被编译成base64的字符串
        //如果大于20480 不会编译成base64字符串  并且依赖于file-loader 会把图片复制到输出目录bin  
        
      }
    ]
  }
}