import express from 'express';
import proxy from 'express-http-proxy';

const app = express()

const PORT = 3000

const mode = process.env.ASSETS_MODE

if(mode === 'dynamic') {
  app.use('/', proxy('localhost:3001'));
  app.use('/me', proxy('localhost:3001'));
  app.use('/members', proxy('localhost:3001'));
  app.use('/about', proxy('localhost:3001'));
} else {
  app.use(express.static('build'))
}

console.log("running server on port " + PORT)
app.listen(PORT)
