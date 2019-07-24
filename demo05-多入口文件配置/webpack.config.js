const path = require('path')
const HtmlWebpackPligun = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: { // 多入口
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    // [name] 代表 entry 定义的入口name，如 home、other
    filename: '[name].[hash:5].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3000
  },
  plugins: [
    new HtmlWebpackPligun({
      template: './index.html',
      filename: 'index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPligun({
      template: './index.html',
      filename: 'other.html',
      chunks: ['other']
    })
  ]
}