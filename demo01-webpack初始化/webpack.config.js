// webpack 是 node 写出来的，node 写法
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production', // 模式 默认有2中 production development
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'boundle.[hash:5].js', // 输出文件名称
    path: path.resolve(__dirname, 'dist') // 输出文件路径 绝对路径
  },
  devServer: { // 开发服务器的配置
    port: 3000,  // 端口号
    progress: true,  // 进度条
    contentBase: './build'  // 指定某个文件夹下为静态服务
  },
  plugins: [ // 插件，数组 配置所有的 webpack 的插件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板
      filename: 'index.html', // 文件名
      minify: { // 压缩模板 html
        removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: true // 压缩
      },
      hash: true // 对html中引用的js文件后添加 hash
    })
  ]
}