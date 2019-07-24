const button = document.createElement('button');
button.innerHTML = 'Click';

// vue 的懒加载   react 的懒加载
button.addEventListener('click', function() {
  console.log('click');
  // 懒加载 jsonp 实现动态加载文件
  // 返回的是个 promise
  import('./source').then(res => {
    console.log('source ', res.default)
  });
})

document.body.appendChild(button);


// 检测热更新代码
import str from './source';
console.log(str);
if (module.hot) {
  module.hot.accept('./source', () => {
    console.log('文件更新了~~~');
    const str = require('./source');
    console.log('更新后...', str.default);
  })
}

