import { addRandomMember, getMembers } from './queries'
import db from './db'

beforeEach(() => db.delete().from('members'))

describe('addRandomMember + getMembers', () => {
  test('adds a random member + returns the list of members', done => {
    getMembers()
      .then(resp => {
        expect(resp.length).toEqual(0)
      })
      .then(addRandomMember)
      .then(getMembers)
      .then(resp => {
        expect(resp.length).toEqual(1)
        done()
      })
  })
})
