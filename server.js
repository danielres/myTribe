import dotenv from 'dotenv'
import express from 'express'

import path from 'path'

import { addRandomMember, findMemberBySlug, getMembers } from './db/queries'

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

app.get('/api/members', (req, res, next) => {
	getMembers(
		(err, resp) =>
			err
				? console.log(err)
				: // : res.json(members)
					res.json(
						resp.rows.map((row) => ({
							...row,
							url: `/members/${row.slug}`,
							...fakeFields,
						}))
					)
	)
})

app.get('/api/members/add', (req, res, next) => {
	addRandomMember((err, resp) => {
		console.log(err, resp)

		getMembers(
			(err, resp) =>
				err
					? console.log(err)
					: res.json(
							resp.rows.map((row) => ({
								...row,
								url: `/members/${row.slug}`,
								...fakeFields,
							}))
						)
		)
	})
})

app.get('/api/members/:slug', (req, res, next) => {
	findMemberBySlug(req.params.slug)((err, resp) => {
		err ? console.log(err) : res.json(resp.rows[0])
	})
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
