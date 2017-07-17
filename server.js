import dotenv from 'dotenv'
import express from 'express'
import proxy from 'express-http-proxy'
import path from 'path'
import { connect, query } from './db/adapter'

dotenv.config()

const app = express()

const PORT = 3001

const { ASSETS_MODE } = process.env

const fakeFields = {
  addedByMember: {
    id: 1,
    slug: 'Albert',
    url: '/members/Albert',
    name: 'Albert',
  },
  address: '123 Happy street, 10000 Berlin',
  email: 'test@test.com',
  fbProfileUrl: 'http://google.com',
  intro: `Hello everyone, ...`,
  introUrl: `http://google.com`,
  memberSince: '2017-01-05',
  phone: '+49 151515 151515',
}

const members = [
  {
    id: 1,
    slug: 'Albert',
    url: '/members/Albert',
    name: 'Albert',
    ...fakeFields,
  },
  { id: 2, slug: 'Eve', url: '/members/Eve', name: 'Eve', ...fakeFields },
  {
    id: 3,
    slug: 'Ezequiel',
    url: '/members/Ezequiel',
    name: 'Ezequiel',
    ...fakeFields,
  },
  {
    id: 4,
    slug: 'Gustavo',
    url: '/members/Gustavo',
    name: 'Gustavo',
    ...fakeFields,
  },
  {
    id: 5,
    slug: 'Daniel',
    url: '/members/Daniel',
    name: 'Daniel',
    ...fakeFields,
  },
]

app.get('/api/members', (req, res, next) => {
  res.json(members)
})

app.get('/api/members/:slug', (req, res, next) => {
  res.json(members.find(m => m.slug === req.params.slug))
})

if (ASSETS_MODE === 'static') {
  // Serve static assets
  app.use(express.static(path.resolve(__dirname, '.', 'build')))

  // Always return the main index.html, so react-router render the route in the client
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', 'build', 'index.html'))
  })
}

console.log('running server on port ' + PORT)
app.listen(PORT)
