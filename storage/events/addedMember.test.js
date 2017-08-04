import addedMember from './addedMember'
import db from '../db'

const getEvents = async () => await db('events').select()

describe('addedMember event', () => {
  test('adds an event of type "addedMember" ', async done => {
    expect(await getEvents()).toHaveLength(0)

    await addedMember({ displayName: 'Jules', slug: 'jules' })

    expect(await getEvents()).toHaveLength(1)
    expect((await getEvents())[0].type).toEqual('addedMember')
    expect((await getEvents())[0].attrs.slug).toEqual('jules')

    done()
  })
})
