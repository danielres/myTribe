var express = require('express')
var proxy = require('express-http-proxy');

var app = express()

var PORT = 3000

var mode = 'static'

if(mode === 'dynamic') {
  app.use('/', proxy('localhost:3001'));
} else {
  app.use(express.static('build'))
}

console.log("running server on port " + PORT)
app.listen(PORT)
