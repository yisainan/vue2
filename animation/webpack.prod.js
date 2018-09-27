var path = require('path');
var version = require('./package.json').version;
var webpack = require('webpack');

module.exports = {
	entry: {
		animation: './src/animation.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].min.js',
		library: 'animation',
		libraryTarget: 'umd'
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(version)
		})
	]
};