import _knex from 'knex'

const knex = _knex({
	client: 'pg',
	connection: {
		database: process.env.PGDB,
		host: 'db',
		password: process.env.PGPASSWORD,
		user: process.env.PGUSER,
	},
	pool: { min: 0, max: 7 },
})

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

export const addRandomMember = (callback) => {
	const rand = Math.random()

	return knex
		.insert({
			name: `Member ${rand}`,
			slug: rand,
			address: 'Cute street',
			email: 'toto@example.com',
			fb_profile_url: 'http://...',
			intro: 'Hello there !',
			intro_url: 'http://...',
			member_since: undefined,
			phone: '+49 ...',
		})
		.into('members')
}

//prettier-ignore
export const getMembers = () =>
	knex
		.select()
		.from('members')
		.then((resp) =>
			resp.map((member) => ({
				...member,
				url: `/members/${member.slug}`,
				...fakeFields,
			}))
	)

//prettier-ignore
export const findMemberBySlug = (slug) =>
	knex
		.select()
		.from('members')
		.where({ slug })
		.then((resp) => resp[0])
