import { addRandomMember, getMembers } from './queries'
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
