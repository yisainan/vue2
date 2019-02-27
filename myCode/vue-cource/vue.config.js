const path = require('path')

const resolve = dir => path.join(__dirname, dir)

import BASE_URL from process.env.NODE_ENV === 'procution' ? '/' : '/'

module.exports = {
  lintOnSave: false, // 取消每次保存时的eslint语法检测
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
