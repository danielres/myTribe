import db from './db'

export const addMember = attrs =>
  db.transaction(tx => tx.insert(attrs).into('members'))

export const getMembers = () =>
  db('members').then(resp =>
    resp.map(member => ({
      ...member,
      url: `/members/${member.slug}`,
    }))
  )

export const findMemberBySlug = slug =>
  db('members').where({ slug }).then(resp => resp[0])
