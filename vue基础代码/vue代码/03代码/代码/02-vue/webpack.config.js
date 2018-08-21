//就是一个普通的node模块


//一  配置热加载服务器

//1 下载 webpack-dev-server   实时打包、实时刷新浏览器，开启服务器，自动打开浏览器
    
//cnpm install webpack-dev-server --save-dev

//2 下载html-webpack-plugin  会把打包好的js，插入到页面上

//cnpm install html-webpack-plugin --save-dev


//3 配置package.json中的scripts
//"dev": "webpack-dev-server --inline --hot --open --port 3000"

//4 运行  npm run dev
//报错   Error: Cannot find module 'webpack'
//本地安装webpack
// npm install webpack --save-dev


//5 运行还报错  Error: `output.path` needs to be an absolute path or `/`.
//webpack.config.js 中的output.path不可以是相对路径

//6 运行起来，但是没有显示页面，因为dev-server默认打开的页面是index.html


//7 此时运行html，没有执行js代码

//8 打包好的js插入页面   -- html-webpack-plugin



//二 配置es6==》es5
//1 

'use strict';

let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

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
      },
      {
        //把js文件中的es6--》es5
        test: /\.js$/,
        exclude: /node_modules/,           //排除指定内容
        loader: 'babel-loader'
      },
      {
          test: /\.vue$/,
          loader: 'vue-loader'
      }
    ]
  },
  plugins: [
        new htmlWebpackPlugin({
            title: '页面标题',  //生成页面标题
            filename: 'index.html',
            template: 'template.html'
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