import { addMember } from './commands'
import { findMemberBySlug, getMembers } from './queries'

describe('addMember + findMemberBySlug + getMembers', () => {
  test('adds a member + finds it by its slug + gets the list of members', async done => {
    const attrs = {
      displayName: `Tom`,
      infos: {
        addedAt: new Date(),
      },
      invitedBy: null,
      slug: `tom`,
    }
    await addMember(attrs)
    expect((await findMemberBySlug('tom')).displayName).toEqual('Tom')
    expect((await getMembers()).length).toEqual(1)
    done()
  })
})
