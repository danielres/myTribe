import { tx } from './db'

export const addRandomMember = callback => {
  const rand = Math.random()

  return tx(t =>
    t
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
        invitedBy: null,
        slug: `mem-${rand}`,
      })
      .into('members')
  )
}

export const getMembers = () =>
  tx(t =>
    t.select().from('members').then(resp =>
      resp.map(member => ({
        ...member,
        url: `/members/${member.slug}`,
      }))
    )
  )

//prettier-ignore
export const findMemberBySlug = (slug) =>
  tx(t =>
    t.select()
      .from('members')
      .where({ slug })
      .then((resp) => (resp[0]))
  )
