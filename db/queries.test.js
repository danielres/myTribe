import { addRandomMember, getMembers } from './queries'
import db from './db'

const resetDb = done =>
  db.migrate.rollback().then(() => db.migrate.latest()).then(done)

beforeEach(resetDb)
afterAll(resetDb)

describe('addRandomMember + getMembers', () => {
  test('adds a random member + returns the list of members', done =>
    getMembers()
      .then(resp => expect(resp.length).toEqual(0))
      .then(addRandomMember)
      .then(getMembers)
      .then(resp => expect(resp.length).toEqual(1))
      .then(done))
})
