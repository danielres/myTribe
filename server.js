var express = require('express')
var proxy = require('express-http-proxy');

var app = express()

app.get('/hello', function (req, res) {
  res.send('Hello World')
})

app.use('/', proxy('localhost:3001'));

app.listen(3000)
