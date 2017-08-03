// import dotenv from 'dotenv'
import express from 'express'

import path from 'path'

import { addMemberEvent, playEvents } from './db/events'
import { findMemberBySlug, getMembers } from './db/queries'

// dotenv.config()

const app = express()
const PORT = 3001
const { ASSETS_MODE } = process.env

app.get('/api/members', (req, res, next) => {
  getMembers()
    .then(resp => res.json(resp))
    .catch(err => console.log(err))
})

app.get('/api/members/add', (req, res, next) => {
  const rand = Math.random()
  const attrs = {
    displayName: `Mem-${rand}`,
    infos: {
      addedAt: new Date(),
      address: 'Sunny street',
      email: `${rand}@example.com`,
      fbProfileUrl: 'http://...',
      firstName: 'Member',
      introUrl: 'http://...',
      lastName: `${rand}`,
      phone: `+49 ${rand}`,
    },
    invitedBy: null,
    slug: `mem-${rand}`,
  }

  addMemberEvent(attrs)
    .then(playEvents)
    .then(getMembers)
    .then(res.json.bind(res))
    .catch(console.error)
})

app.get('/api/members/:slug', (req, res, next) => {
  findMemberBySlug(req.params.slug)
    .then(resp => res.json(resp))
    .catch(err => console.log(err))
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
