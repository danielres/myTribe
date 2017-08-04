import addMemberEvent from './addMemberEvent'
import db from '../db'

const getEvents = async () => await db('events').select()

describe('addMemberEvent', () => {
  test('adds an event of type "addMember" ', async done => {
    expect(await getEvents()).toHaveLength(0)

    await addMemberEvent({ displayName: 'Jules', slug: 'jules' })

    expect(await getEvents()).toHaveLength(1)
    expect((await getEvents())[0].type).toEqual('addMember')
    expect((await getEvents())[0].attrs.slug).toEqual('jules')

    done()
  })
})
