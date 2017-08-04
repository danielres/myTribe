import { addMember } from './commands'
import { getEvents } from './events'
import { getMembers } from './queries'

describe('addMember command', () => {
  test('inserts the event and member into the DB', async done => {
    expect((await getEvents()).length).toEqual(0)
    expect((await getMembers()).length).toEqual(0)
    const attrs = {
      displayName: `Felix`,
      slug: `felix`,
    }
    await addMember(attrs)
    expect((await getMembers())[0].slug).toEqual('felix')
    expect((await getEvents())[0].type).toEqual('addMember')
    expect((await getEvents())[0].attrs.slug).toEqual('felix')
    done()
  })
})
