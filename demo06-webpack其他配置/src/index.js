console.log('home')
import 'bootstrap'
import './style'

class Log{
  constructor() {
    console.log('出错了!')
  }
}
const log = new Log()

let url = ''
if (DEV === 'dev') {
  url = 'http://localhost:3000'
} else {
  url = 'http://www.yn.com'
}

console.log('------ ', url, ' ------');

const xhr = new XMLHttpRequest()
xhr.open('GET', '/api/user', true)

xhr.onload = function() {
  console.log(xhr.response)
}

xhr.send()
