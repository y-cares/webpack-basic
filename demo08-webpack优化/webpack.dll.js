const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js', // 产生的文件名
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]', // 指定输出文件方法的名
    // libraryTarget: 'var' // 使用的规则模式 如：commonjs var this...
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]', // name == library
      path: path.resolve(__dirname, 'dist', 'manifest.json') // manifest任务清单
    })
  ]
}
