'use-strict'

var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev.js')

var app = express()
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  stats: {
    colors: true,
    assets: false,
    chunks: false
  }
}))

app.use(require('webpack-hot-middleware')(compiler))

app.listen(process.env.HOT_PORT, 'localhost', function (err) {
  if (err) {
    console.error(err)
    return
  }

  console.log('hot Listening at http://localhost:' + process.env.HOT_PORT)
})
