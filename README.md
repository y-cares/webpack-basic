## 常用插件

### html plugin
  html-webpack-plugin html 模板插件

### css plugin
  mini-css-extract-plugin 抽离css的插件
  optimize-css-assets-webpack-plugin 用于优化或最小化 css 资源。可用于解决 extract-text-webpack-plugin css重复问题

### js plugin
  uglifyjs-webpack-plugin 优化压缩 js

## 常用loader

### css loader
  autoprefixer 给css样式添加前缀

### js loader
  babel-loader 转义 js
  @babel/preset-env 为每个环境预设的Babel。
  @babel/plugin-proposal-class-properties 此插件转换静态类属性以及使用属性初始化程序语法声明的属性
  @babel/plugin-transform-runtime 外部引用辅助函数和内置函数，自动填充代码而不会污染全局变量
  eslint eslint-loader 代码校验

### img loader
  file-loader  编译图片 用于 js、css 中引用的img
  html-withimg-loader 解析 html 中的img
  url-loader 做一个限制，当图片小于多少k时，用 base64 来转换


## 常用中间件
  webpack-dev-middleware 在服务端启动webpack的中间件

## 常用插件
  webpack-merge 可将公共的erbpack配置合并到一起

