const path = require('path')
const HtmlWebpackPligun = require('html-webpack-plugin')

/**
 * 1) cleanWebpackPlugin 每次打包后，清除掉多余的文件
 * 2) copyWebpackPlugin 拷贝文件插件
 * 3) bannerPlugin 内置 版权声明插件
 */
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js'
  },
  output: {
    filename: '[name].[hash:5].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: { // 解析 第三方包
    modules: [ // 规定包的查找范围
      path.resolve('node_modules')
    ],
    extensions: ['.js', '.css', '.json'], // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
    // mainFields: ['style', 'main'] // 主入口
    // mainFiles: [], // 优先采用那入口文件的名字 默认 index.js
    alias: { // 配置项通过别名来把原导入路径映射成一个新的导入路径
      bootstrap: 'bootstrap/dist/css/bootstrap.css'
    },
  },
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
  watch: false, // 时时监控代码的变化，并进行时时打包
  watchOptions: { // 监控 watch 的配置参数
    poll: 1000, // 轮询，每秒询问1000次是否更新 最佳 1000 次
    aggregateTimeout: 500, // 防抖 500ms 后再打包
    ignored: /node_modules/ // 排除 node_modules 文件
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      }

    ]
  },
  plugins: [
    new HtmlWebpackPligun({
      template: './index.html',
      filename: 'index.html',
      chunks: ['home']
    }),
    new CleanWebpackPlugin(
      {
        root: path.resolve(__dirname, './dist'),
        dry: false // 启用删除文件
      }
    ),
    new CopyWebpackPlugin([
      {from: './doc', to: './'}
    ]),
    new webpack.BannerPlugin('make 2018 by yn'), // 版权声明插件
  ]
}