import db from './db'

export const addMember = attrs =>
  db.transaction(tx => tx.insert(attrs).into('members'))

export const addRandomMember = () => {
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
  return addMember(attrs)
}

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
