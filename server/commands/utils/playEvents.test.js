import { getMembers } from '../../queries/queries'
import { playEvent, playEvents } from './playEvents'
import addedMember from '../events/addedMember'
import db from '../../db/db'

const getEvents = async () => await db('events').select()

describe('playEvent', () => {
  test('plays the event, marks it as played', async done => {
    expect(await getEvents()).toHaveLength(0)
    expect(await getMembers()).toHaveLength(0)

    await addedMember({ displayName: 'Jules', slug: 'jules' })
    const event = (await getEvents())[0]
    await playEvent(event)

    const playedEvent = (await getEvents())[0]
    expect(playedEvent.isPlayed).toEqual(true)
    const newMember = (await getMembers())[0]
    expect(newMember.displayName).toEqual('Jules')
    done()
  })
})

describe('playEvents', () => {
  test('plays all unplayed events', async done => {
    expect(await getEvents()).toHaveLength(0)
    expect(await getMembers()).toHaveLength(0)

    await addedMember({ displayName: 'Jan', slug: 'jan' })
    expect(await getEvents()).toHaveLength(1)
    expect(await getMembers()).toHaveLength(0)

    await playEvents()
    expect(await getMembers()).toHaveLength(1)

    await addedMember({ displayName: 'Ted', slug: 'ted' })
    await addedMember({ displayName: 'Tom', slug: 'tom' })
    expect((await getEvents()).length).toEqual(3)

    await playEvents()
    expect((await getMembers()).length).toEqual(3)

    done()
  })
})
