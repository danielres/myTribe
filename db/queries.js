import { query } from './adapter'

export const addRandomMember = (callback) => {
	const rand = Math.random()

	query(
		`INSERT INTO members (name, slug, address, email, fb_profile_url, intro, intro_url, member_since, phone)
    VALUES ('Member ${rand}', '${rand}', 'Happy street', 'example@example.com', 'https://facebook.com/', 'Hi there', 'https://facebook.com/intro', NULL, '+49 ...');`,
		callback
	)
}

export const getMembers = (callback) => {
	query('SELECT * FROM members;', callback)
}

export const findMemberBySlug = (slug) => (callback) => {
	query(`SELECT * FROM members WHERE slug='${slug}';`, callback)
}
