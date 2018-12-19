//webpack.config.js
module.exports = {
	devtool: 'eval-source-map', //用于调试代码
	entry: __dirname + "/main.js", //已多次提及的唯一入口文件
	output: {
		path: __dirname + "/public", //打包后的文件存放的地方
		filename: "bundle.js" //打包后输出文件的文件名
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}, {
			test: /\.vue$/,
			loader: 'vue-loader'
		}]
	},
	devServer: {
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: true //实时刷新
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	}
}