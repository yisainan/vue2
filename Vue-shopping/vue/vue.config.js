const path = require('path')
const Compression = require('compression-webpack-plugin')   // gzip压缩
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 包的大小分析工具
function resolve(dir) {
    return path.join(__dirname, dir)
}

const debug = process.env.NODE_ENV === 'production'
module.exports = {
    publicPath: debug ? '/public/static/' : '/',
    chainWebpack: config => {
        config.resolve.alias
            .set('js', resolve('src/assets/js'))
            .set('css', resolve('src/assets/css'))
            .set('img', resolve('src/assets/img'))
            .set('public', resolve('src/components/public'))
    },
    devServer: {
        port: 8090,
        open: false, // 是否自动打开浏览器页面
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    productionSourceMap: false, //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    configureWebpack: config => {    // gzip压缩
        if (debug) {
            return {
                plugins: [
                    new Compression({
                        test: /\.js$|\.html$|\.css/,    // 匹配文件名
                        threshold: 10240,               // 对超过10k的数据进行蒴
                        deleteOriginalAssets: false,    // 是否删除源文件
                    })
                ]
            }
        }
        // if (!debug) {
        //     return {
        //         plugins: [
        //             // 使用包分析工具
        //             new BundleAnalyzerPlugin()
        //         ]
        //     }
        // }
    }
}