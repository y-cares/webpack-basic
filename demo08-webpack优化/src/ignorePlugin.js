// 配置 IgnorePlugin 后的测试代码
import $ from 'jquery';
import moment from 'moment';

/* 设置语言
  因在 webpack 配置中忽略了 locale 文件的引用，
  如需再次使用，需要进行手动引用所需要的语言
  */
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const r = moment().endOf('day').fromNow();
console.log(r);


