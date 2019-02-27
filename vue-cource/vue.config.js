const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
  lintOnSave: false,
  baseUrl: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    // proxy: 'http://localhost:3000'
  }
}
