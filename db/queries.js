import db from './db'

export const addMember = attrs =>
  db.transaction(tx => tx.insert(attrs).into('members'))

export const getMembers = () =>
  db.transaction(tx =>
    tx.select().from('members').then(resp =>
      resp.map(member => ({
        ...member,
        url: `/members/${member.slug}`,
      }))
    )
  )

//prettier-ignore
export const findMemberBySlug = (slug) =>
  db.transaction(tx =>
    tx.select()
      .from('members')
      .where({ slug })
      .then((resp) => (resp[0]))
  )
