// smart 用于合并合并的配置选项
const { smart } = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = smart(base, {
  mode: 'development',
  devServer: {
    port: 8080,
    // 1) webpack 设置反向代理进行跨域
    proxy: { // 代理 用于跨域
      '/api': {
        target: 'http://localhost:3000', //  配置一个代理
        pathRewrite: {
          '/api': ''
        }
      }
    }
    // 2) 前端只想单纯模拟数据
    // before(app) { // 提供的方法 app 为 erver 中的 app
    //   app.get('/user', (req, res) => {
    //     res.json({name: 'yn'})
    //   })
    // }
    // 3) 有服务端 不想用代理来处理 而在服务端启动webpack 端口号用服务端的

  },
  // 1) source-map 源码映射，回单独生成一个 sourceMap 文件 
  // 出错会进行标识当前报错的列和行。 功能大而全
  // devtool: 'source-map', // 增加映射文件 可以帮我们调试代码
  // 2) eval-source-map 不会产生单独的文件，但是可以显示报错的行和列
  devtool: 'eval-source-map',
  // 3) cheap-module-source-map 简化的源码映射 不会显示列，但是是一个单独的映射文件
  // devtool: 'cheap-module-source-map', // 产生后你可以保留起来用于调试
  // 4) 不会产生文件 集成在打包后的文件中 不会产生列
  // devtool: 'cheap-module-eval-source-map',
})
