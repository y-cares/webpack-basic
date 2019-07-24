// express
const express = require('express')
const webpack = require('webpack')

const app = express()

// 中间件
const middle = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const compiler = webpack(config)
app.use(middle(compiler))

app.get('/user', (req, res) => {
  res.json({name: 'yn'})
})

app.listen(3000, () => {
  console.log('server is start')
})

