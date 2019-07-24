import calc from './test.js'
// import 在生产环境下，会自动去除没用的代码
// tree-shaking 把没用到的代码 自动删除掉
console.log(calc.sum(1, 2))

// const calc = require('./test')
// require 模块会自动将代码放到一个 default 对象中
// 但不会自动删除多余的代码
// console.log(calc.default.sum(1, 2))

// scope hosting 作用域提升
// 在生产模式下，会自动圣洛一些可以简化的代码
const a = 1;
const b = 2;
const c = 3;
const d = a + b + c;
console.log('------', d, '------');