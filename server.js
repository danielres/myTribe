var express = require('express')
var proxy = require('express-http-proxy');

var app = express()

var mode = 'static'

if(mode === 'dynamic') {
  app.use('/', proxy('localhost:3001'));
} else {
  app.use(express.static('build'))
}

app.listen(3000)
