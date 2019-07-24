// webpack 是 node 写出来的，node 写法
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development', // 模式 默认有2中 production development
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'boundle.[hash:8].js', // 输出文件名称
    path: path.resolve(__dirname, 'build') // 输出文件路径 绝对路径
  },
  devServer: { // 开发服务器的配置
    port: 3000,  // 端口号
    progress: true,  // 进度条
    contentBase: './build'  // 指定某个文件夹下为静态服务
  },
  module: { // 模块
    rules: [ // 规则
        // loader 的特点：功能单一，一个loader只解析一个文件
        // loader 的编译顺序：默认是从右向左、从下向上执行
      // { // 全局暴露 方法二
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$'
      // },
      { // eslint 代码校验
        // test: /\.js$/,
        // use: {
        //   loader: 'eslint-loader',
        //   options: {
        //     enforce: 'pre' // previous 强制在 js 编译前校验  post 强制在 js 编译后执行
        //   }
        // },
        // enforce: "pre",
        // test: /\.js$/,
        // exclude: /node_modules/,
        // loader: "eslint-loader"
      },
      { // 编译 css 的模块：
        // css-loader：负责解析css 包括 @import 这种语法
        // style-loader：把 css 插入到 header 的标签中
        test: /\.css$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: { // 当前 loader 的配置参数
          //     insertAt: 'top' // style 标签插入位置
          //   }
          // },
          MiniCssExtractPlugin.loader, // 抽离css
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // 抽离css
          // 'style-loader', 
          'css-loader',
          'postcss-loader',
          'less-loader' // 把 less 转化成 css
        ]
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'), // 只解析src文件夹下的 js
        exclude: /node_modules/, // 排除 node_modules 文件夹下的 js
        use: [
          {
            loader: 'babel-loader',
            options: { // 用babel-loader 需要把 es6 转化成 es5
              presets: [
                '@babel/preset-env' // 为每个环境预设的Babel。
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰修 如 js 中的 @log 中 @ 装饰器
                ["@babel/plugin-proposal-class-properties", { "loose" : true }], // 此插件转换静态类属性以及使用属性初始化程序语法声明的属性
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: { // 优化项
    minimizer: [
      new UglifyJsPlugin({ // 优化js
        cache: true, // 是否适用缓存
        parallel: true, // 是否并发压缩（打包多个）
        sourceMap: true // 源码映射，用于调试
      }), 
      new OptimizeCssAssetsWebpackPlugin({}) // 优化css
    ]
  },
  externals: { // 若模块重复引用的话，则忽略掉多余引用的模块
    jquery: '$'
  },
  plugins: [ // 插件，数组 配置所有的 webpack 的插件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板
      filename: 'index.html', // 文件名
      minify: { // 压缩模板 html
        removeAttributeQuotes: true, // 删除双引号
        // collapseWhitespace: true // 压缩
      },
      // hash: true // 对html中引用的js文件后添加 hash
    }),
    new MiniCssExtractPlugin({ // 抽离 css 的插件
      filename: 'index.css', // css 文件名
    }),
    new webpack.ProvidePlugin({ // 全局暴露方法三：在每个模块中注入 jquery
      // ProvidePlugin 提供插件
      $: 'jquery'
    })
  ]
}