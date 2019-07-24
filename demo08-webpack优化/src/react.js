/** 因 react 和 react-dom 是通用第三方的依赖库，不会发生改变。
 * 因此也不需要重新打包。所以需要 dllPlugin 将这两个依赖抽离出来，
 * 减小打包后的文件的大小。
 * 配置内容在： webpack.react.js 中。
*/
import React from 'react';
import { render } from 'react-dom';

render(<h1>XXX</h1>, window.root)
