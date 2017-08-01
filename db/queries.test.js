import { addRandomMember, getMembers } from './queries'
import resetDb from '../test/support/resetDb'

beforeEach(resetDb)
afterAll(resetDb)

describe('addRandomMember + getMembers', () => {
  test('adds a random member + returns the list of members', async (done) => {
    expect((await getMembers()).length).toEqual(0)
    await addRandomMember()
    expect((await getMembers()).length).toEqual(1)
    done()
  })
})
