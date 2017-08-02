import { addMember, addRandomMember, findMemberBySlug, getMembers } from './queries';
import disconnectDb from '../test/support/disconnectDb'
import resetDb from '../test/support/resetDb'

beforeEach(resetDb)
afterAll(disconnectDb)

describe('addRandomMember + getMembers', () => {
  test('adds a random member + returns the list of members', async (done) => {
    expect((await getMembers()).length).toEqual(0)
    await addRandomMember()
    expect((await getMembers()).length).toEqual(1)
    done()
  })
})

describe('addMember + findMemberBySlug', () => {
  test('adds a member + finds it by its slug', async (done) => {
    const attrs = {
      displayName: `Tom`,
      infos: {
        addedAt: new Date(),
      },
      invitedBy: null,
      slug: `tom`,
    }
    await addMember(attrs)
    expect((await findMemberBySlug('tom')).displayName).toEqual("Tom")
    done()
  })
})
