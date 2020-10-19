const path = require('path')
const resolve = function (dir) {
    return path.join(__dirname, dir)
}


module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",  //直接部署dist
    outputDir: 'dist',
    lintOnSave: false, // 是否开启eslint保存检测
    productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('views', resolve('src/views'))
        config.optimization.runtimeChunk('single')
    },
    devServer: {
        host: '127.0.0.1',
        port: '8080',
        hot: true,
        open: true,
        proxy: {
            "/todo/": {
                target: "http://127.0.0.1:6000",
                changeOrigin: true,
                secure: false
            }
        }
    }
}