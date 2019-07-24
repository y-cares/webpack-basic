// smart 用于合并合并的配置选项
const { smart } = require('webpack-merge');
const base = require('./webpack.base.js');
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = smart(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ // 优化js
        cache: true, // 是否适用缓存
        parallel: true, // 是否并发压缩（打包多个）
        sourceMap: true // 源码映射，用于调试
      }), 
      new OptimizeCssAssetsWebpackPlugin({}) // 优化css
    ]
  },
  plugins: [
    
  ]
})
