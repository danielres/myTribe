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

export const addRandomMember = (callback) => {
	const rand = Math.random()

	return knex
		.insert({
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
			invitedBy: '8bb961e3-8319-4681-9921-ec70633324a0',
			slug: `mem-${rand}`,
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
			}))
	)

//prettier-ignore
export const findMemberBySlug = (slug) =>
	knex
		.select()
		.from('members')
		.where({ slug })
		.then((resp) => (resp[0]))
