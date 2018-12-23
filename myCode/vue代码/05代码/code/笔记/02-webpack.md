# webpack的使用

## Webpack的介绍

```
Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 CMD 模块、ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。
```

## webpack安装

npm install webpack -g
 
## Webpack的使用

- 基本演示

```
webpack main.js build.js

会把基于模块开发的main.js引用的外部模块合并到build.js中。
页面上直接引用build.js
```

- 配置文件

```
	webpack.config.js  webpack默认的配置文件
	将来在命令行运行webpack就会自动执行配置文件中的内容

	//
	module.exports = {
     entry: './main.js',  //入口的js文件
     output: {
         path: './bin',   //打包输出的目录
         filename: 'build.js'   //文件名
     }
 };
```


## Webpack常用的Loader

webpack默认只能打包js文件

### 打包css文件

- 初始化项目

cnpm init

- 下载style-loader和css-loader

cnpm install css-loader style-loader --save-dev 

- 配置文件

```javascript
module.exports = {
     entry: './main.js',
     output: {
         //path: './bin',    //可以设置打包输出的路径
         filename: 'build.js'
     },
     module: {
         loaders: [{
             test: /\.css$/,
             exclude: /node_modules/,           //排除指定内容
             loader: 'style-loader!css-loader'  //执行顺序从右向左
         }]
     }
 };
```

-- 执行打包

webpack

### autoprefixer-loader自动添加css前缀

- 下载
cnpm install autoprefixer-loader --save-dev

- 配置文件

```
 loader: 'style-loader!css-loader!autoprefixer-loader'
``` 

- 演示

+ 添加私有前缀
a {
    transition: transform 1s;
}

+ 去除过期的前缀
-webkit-border-radius: 5px;
border-radius: 5px;

### 打包less

- 下载
cnpm install less-loader less --save-dev

- 配置文件

```
 loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
```

- 演示(.less文件)
@color: yellow;

body {
    background-color: @color;
}

### 打包sass


- 下载
cnpm install sass-loader node-sass --save-dev

- 配置文件
```
 loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
```
- 演示(.scss)
$color: red;

body {
    background-color: $color;
}

### url-loader

- 下载
cnpm install url-loader --save-dev

依赖file-loader
cnpm install file-loader --save-dev


- 配置文件

```
    小于80k的文件，把图片进行base64编码，减少一次http请求

 {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=80000'  
 }
```

- 处理图标字体
{
    test: /\.(png|jpg|eot|svg|ttf|woff|otf)/,
    loader: 'url-loader?limit=80000' //可以简写'url?limit=20000'  单位是字节
}

### 设置路径

dist
src
    statics
        css
        images
        font

!注意引用的路径(样式中引用的图片路径出问题)
运行index.html和打包的文件的路径不一致
运行路径不对，解决看下节

### 实时打包和浏览器实时刷新

- 下载安装webpack-dev-server和html-webpack-plugin

cnpm install webpack-dev-server --save-dev
cnpm install webpack-dev-server -g


如果使用npm run dev的方式来运行的话
需要本地安装webpack     npm install webpack --save-dev

- 运行

webpack-dev-server --inline --hot --open --port 3000

- 配置

在package.json中配置
```
    "scripts": {
        "dev": "webpack-dev-server --inline --hot --open --port 3000"
     }
```

- 参数

inline  自动刷新
hot     热加载
open    自动在默认浏览器中打开
port    指定端口

- 运行

npm run dev

删除dist中打包的内容
运行引用的图片和图标字体看不到，解决见下节

### 在内存中生成index.html，并且自动打包编译的文件(app.js中引用的文件)

- 下载html-webpack-plugin

cnpm install html-webpack-plugin --save-dev

- 配置 webpack.config.js

```
    var htmlWebpackPlugin = require('html-webpack-plugin');

    plugins: [
        new htmlWebpackPlugin({
            title: '页面标题',  //生成页面标题
            filename: 'index.html',
            template: 'index1.html'
        })
     ]
```

### ES6转ES5

webpack2.0 默认支持es6的模块化语法 import/export

- 下载

cnpm install babel-core babel-loader babel-preset-es2015 --save-dev
//包装能够转换.vue文件中的es6语法
cnpm install babel-plugin-transform-runtime --save-dev

- 配置 webpack.config.js

```
    loader里面配置
    {
        test: /\.js$/,
        exclude: /node_modules/,           //排除指定内容
        loader: 'babel-loader'
    }


    //并且需要下面一行代码
    let webpack = require('webpack');
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
```

### 常用到的ES6语法

- 导入外部文件，导入css文件

```javascript
import './statics/css/style.scss';
import './statics/css/font-awesome.css';
```

- 导入一个js模块，接受一个对象

```javascript
import obj from './add.js';
```

- 模块中导出对象

```javascript
//ES6中导出模块中的对象
export default {
    add: add, 
    sub: sub
}

//简写
export default {
    add, sub
}

//更简洁的语法
export default {
    add(a, b) {
        return (a - 0) + (b - 0);
    },
    sub(a, b) {
        return (a - 0) + (b - 0);
    }
}

//ES6导入模块中的对象
import obj from './math.js';


//commonjs中的写法
module.exports = {
    add: add,
    sub: sub
}
//简写，属性名和属性值的名称相同
module.exports = {
    add, sub
}

```

- 模块中导出方法

```javascript
//ES6导出方法
export function add() {}
export function sub() {}

//ES6中导入方法
import {add} from './math.js'


//commonjs中的写法
module.exports = {
    add: function(x, y) {
        return x + y;
    }
}

//导出方法简写
module.exports = {
    add(x, y) {
        return x + y;
    }
}

```




