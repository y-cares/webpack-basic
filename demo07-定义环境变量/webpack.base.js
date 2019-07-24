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
  watch: false, // 时时监控代码的变化，并进行时时打包
  watchOptions: { // 监控 watch 的配置参数
    poll: 1000, // 轮询，每秒询问1000次是否更新 最佳 1000 次
    aggregateTimeout: 500, // 防抖 500ms 后再打包
    ignored: /node_modules/ // 排除 node_modules 文件
  },
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
    new webpack.DefinePlugin({ // 定义自定义的环境变量
      DEV: JSON.stringify('production'),
      FLAG: 'true',
      EXPRESSION: '1+1'
    })
  ]
}