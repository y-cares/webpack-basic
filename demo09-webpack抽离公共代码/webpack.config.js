const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // noParse 不去解析jquery中的依赖库
    // 值可为 /jquery|react/ 
    noParse: /jquery/, 
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // 优化
  optimization: {
    // 分割代码块
    splitChunks: {
      // 缓存组
      cacheGroups: {
        // 公共模块
        common: {
          chunks: 'initial', // 刚开始时就抽离代码
          minSize: 0, // 代码的大小
          minChunks: 2 // 使用多少次
        },
        // 单独打包公共模块
        vendor: {
          priority: 1, // 权重，权重越高，越先抽离
          test: /node_modules/, // 把你抽离出来
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      },
    }
  },
  plugins: [
    // IgnorePlugin 忽略掉指定依赖中指定的文件
    // 如下：忽略 moment 中所有的 ./locale  文件夹下的文件
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
