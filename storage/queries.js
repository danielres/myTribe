import db from './db'

const addUrl = member => ({
  ...member,
  url: `/members/${member.slug}`,
})

export const getLogItems = () =>
  db('events').orderBy('createdAt', 'desc')

export const getMembers = () => db('members').map(addUrl)

export const findMemberBySlug = slug =>
  db('members').where({ slug }).map(addUrl).then(resp => resp[0])
