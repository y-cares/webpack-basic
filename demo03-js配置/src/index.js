const str = require('./a.js')
require('./index.css')
require('./index.less')

console.log(str)

const fn = () => {
  console.log('log');
}
fn()

@log // 装饰器
class A{
  a = 1;
}

const a = new A()
console.log(a.a)

// 装饰器就是一个函数
function log(target) {
  console.log('类', target)
}

// expose-loader 暴露 全局的loader 内联的loader
// pre 前面执行的loader 
// normal 普通的loader
// post 后置的loader
// expose-loader 内联的loader

// import $ from 'jquery'
// console.log($)

// 全局暴露方法一： 全局的loader 内联的loader
// import $ from 'expose-loader?$!jquery'
// console.log(window.$)

console.log($) // 在每个模块中注入 $ 对象