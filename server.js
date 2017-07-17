import dotenv from 'dotenv'
import express from 'express'

import path from 'path'

import { addRandomMember, findMemberBySlug, getMembers } from './db/queries'

dotenv.config()

const app = express()
const PORT = 3001
const { ASSETS_MODE } = process.env

//prettier-ignore
app.get('/api/members', (req, res, next) => {
	getMembers()
		.then((resp) => res.json(resp))
		.catch((err) => console.log(err))
})

//prettier-ignore
app.get('/api/members/add', (req, res, next) => {
	addRandomMember()
		.then(getMembers)
		.then((resp) => res.json(resp))
		.catch((err) => console.log(err))
	})

//prettier-ignore
app.get('/api/members/:slug', (req, res, next) => {
	findMemberBySlug(req.params.slug)
		.then((resp) => res.json(resp))
		.catch((err) => console.log(err))
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
