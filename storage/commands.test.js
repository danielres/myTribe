import { addMember } from './commands'
import db from './db'

const getMembers = async () => await db('members').select()
const getEvents = async () => await db('events').select()

describe('addMember command', () => {
  test('inserts the event and member into the DB', async done => {
    expect(await getMembers()).toHaveLength(0)
    expect(await getEvents()).toHaveLength(0)

    await addMember({ displayName: `Felix`, slug: `felix` })

    expect((await getMembers())[0].slug).toEqual('felix')
    expect((await getEvents())[0].type).toEqual('addedMember')
    expect((await getEvents())[0].attrs.slug).toEqual('felix')

    done()
  })
})
