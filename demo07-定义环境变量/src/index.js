console.log('home')
import 'bootstrap'
import './style'

class Log{
  constructor() {
    console.log('出错了!')
  }
}
const log = new Log()

let url = 'http://localhost:3000'

console.log('------ ', url, ' ------');
console.log( typeof FLAG);
console.log(EXPRESSION)

const xhr = new XMLHttpRequest()
xhr.open('GET', '/api/user', true)

xhr.onload = function() {
  console.log(xhr.response)
}

xhr.send()
// 

