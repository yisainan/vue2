//就是一个普通的node模块


//演示 css中引用图片

// 1 下载url-loader
// 2 配置webpack.config   要去处理的文件类型


//node的核心模块
let path = require('path');



//为什么要配置热加载服务器
//1 自动打包
//2 开启web服务器
//3 自动在浏览器打开页面---index.html
//4 热加载


//配置热加载服务器
//1 package.json中配置  scripts标签

// "dev": "webpack-dev-server --inline --hot --open --port 3000"
//  启动 方式 命令行 输入    npm run dev

//2 安装webpack-dev-server     开启web服务器，并自动在浏览器中打开首页 热加载
 
// cnpm install webpack-dev-server --save-dev
// cnpm install webpack-dev-server -g

//npm run dev

//3 webpack.config 报错  output.path 只能是绝对路径或者是 /

//4  运行npm run dev   报错   找不到模块webpack  
//本地安装webpack      npm install webpack --save-dev

//5 安装 html-webpack-plugin
// 在内存中生成打包内容

//6 配置webpack.config.js
// var htmlWebpackPlugin = require('html-webpack-plugin');
// plugins: [
//         new htmlWebpackPlugin({
//             title: '页面标题',  //生成页面标题
//             filename: 'index.html',  //生成在内存中的文件的名字
//             template: 'index1.html'  //根据指定的文件生成内容
//         })
//      ] 

//7 index1.html模板 不会热加载   app.js和app.js依赖的文件会热加载


var htmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');
    

module.exports = {
  entry: './src/app.js',   //打包的入口文件
  //设置打包以后的文件存储的位置
  output: {
    path: path.join(__dirname, 'dist'), //打包文件存储的目录
    filename: 'build.js'   //打包的文件名
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,           //排除指定内容
        loader: 'babel-loader'
      },
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
    ],
    
  },
  plugins: [
        new htmlWebpackPlugin({
            title: '页面标题',  //生成页面标题
            filename: 'index.html',  //生成在内存中的文件的名字
            template: 'index1.html'  //根据指定的文件生成内容--作用模板
        }),
        new webpack.LoaderOptionsPlugin({
         options: {
           babel: {
                  presets: ['es2015'],
                  plugins: ['transform-runtime']   //为了转换.vue中的es6的语法
            }
         }
       })
     ]
}