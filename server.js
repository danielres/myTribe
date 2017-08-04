import express from 'express'

import path from 'path'

import { addMemberEvent, playEvents } from './storage/events'
import { findMemberBySlug, getMembers } from './storage/queries'
import randomMemberFactory from './factories/randomMemberFactory'

const app = express()
const PORT = 3001
const { ASSETS_MODE } = process.env

app.get('/api/members', async (req, res, next) => {
  try {
    res.json(await getMembers())
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/members/add', async (req, res, next) => {
  try {
    await addMemberEvent(randomMemberFactory())
    await playEvents()
    const members = await getMembers()
    res.json(members)
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/members/:slug', async (req, res, next) => {
  try {
    const member = await findMemberBySlug(req.params.slug)
    res.json(member)
  } catch (error) {
    console.error(error)
  }
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
