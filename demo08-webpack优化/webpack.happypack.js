const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 模块 happypack 实现多线程打包 
// 项目比较小时，不建议使用多线程打包，
// 只有项目比较大，打包的依赖比较多时，使用多线程更快些
const HappyPack = require('happypack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  output: {
    filename: 'bundle.js',
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
        use: 'HappyPack/loader?id=js'
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: [
        //       '@babel/preset-env',
        //       '@babel/preset-react'
        //     ]
        //   }
        // }
      },
      {
        test: /\.css$/,
        use: 'HappyPack/loader?id=css'
      }
    ]
  },
  plugins: [
    // IgnorePlugin 忽略掉指定依赖中指定的文件
    // 如下：忽略 moment 中所有的 ./locale  文件夹下的文件
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // 该插件的作用：现在manifest.json 中查找已经打包好的静态文件（react、react-dom 原本就是打包好的静态文件）
    // 找不到的话，再在 index.js 引用中打包静态文件
    new webpack.DllReferencePlugin({ 
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
    // 多线程打包配置
    new HappyPack({
      id: 'js',
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }]
    }),
    new HappyPack({
      id: 'css',
      use: ['style-loader', 'css-loader']
    })
  ]
}
