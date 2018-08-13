var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: './example/src/main.js'
  },
  output: {
    path: '/example',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // other vue-loader options go here
          loaders: {
            css: isProduction ? ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: 'css-loader'
            }) : 'vue-style-loader!css-loader',
            less: isProduction ? ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader', 'less-loader']
            }) : 'vue-style-loader!css-loader!less-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}