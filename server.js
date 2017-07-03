import express from 'express'
import proxy from 'express-http-proxy'
import path from 'path'

const app = express()

const PORT = 3001

const { ASSETS_MODE } = process.env

if(ASSETS_MODE === 'static') {
  // Serve static assets
  app.use(express.static(path.resolve(__dirname, '.', 'build')));

  // Always return the main index.html, so react-router render the route in the client
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', 'build', 'index.html'));
  });
}

console.log("running server on port " + PORT)
app.listen(PORT)
