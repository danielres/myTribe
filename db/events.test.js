import { addMemberEvent, getEvents } from './events'
import disconnectDb from '../test/support/disconnectDb'
import resetDb from '../test/support/resetDb'

beforeEach(resetDb)
afterAll(() => resetDb().then(disconnectDb))

describe('addMemberEvent + getEvents', () => {
  test('adds an event of type "addMember" + returns the list of events ', async done => {
    expect((await getEvents()).length).toEqual(0)
    const attrs = {
      displayName: `Jules`,
      infos: {
        addedAt: new Date(),
      },
      invitedBy: null,
      slug: `jules`,
    }
    await addMemberEvent(attrs)
    expect((await getEvents())[0].type).toEqual('addMember')
    done()
  })
})
