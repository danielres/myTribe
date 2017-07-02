import express from 'express'
import proxy from 'express-http-proxy'

const app = express()

const PORT = 3000

const { ASSETS_MODE } = process.env

const routes = [
  '/',
  '/me',
  '/members*',
  '/about',
]

if(ASSETS_MODE === 'dynamic') {
  app.use('/', proxy('localhost:3001'))
} else {
  routes.forEach((route) =>
    app.use(route, express.static('build'))
  )
}

console.log("running server on port " + PORT)
app.listen(PORT)
