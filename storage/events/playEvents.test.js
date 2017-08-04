import { getMembers } from '../queries'
import { playEvent, playEvents } from './playEvents'
import addMemberEvent from './addMemberEvent'
import db from '../db'

const getEvents = async () => await db('events').select()

describe('playEvent', () => {
  test('plays the event, marks it as played', async done => {
    expect(await getEvents()).toHaveLength(0)
    expect(await getMembers()).toHaveLength(0)

    await addMemberEvent({ displayName: 'Jules', slug: 'jules' })
    const event = (await getEvents())[0]
    await playEvent(event)

    const playedEvent = (await getEvents())[0]
    expect(playedEvent.isPlayed).toEqual(true)
    const addedMember = (await getMembers())[0]
    expect(addedMember.displayName).toEqual('Jules')
    done()
  })
})

describe('playEvents', () => {
  test('plays all unplayed events', async done => {
    expect(await getEvents()).toHaveLength(0)
    expect(await getMembers()).toHaveLength(0)

    await addMemberEvent({ displayName: 'Jan', slug: 'jan' })
    expect(await getEvents()).toHaveLength(1)
    expect(await getMembers()).toHaveLength(0)

    await playEvents()
    expect(await getMembers()).toHaveLength(1)

    await addMemberEvent({ displayName: 'Ted', slug: 'ted' })
    await addMemberEvent({ displayName: 'Tom', slug: 'tom' })
    expect((await getEvents()).length).toEqual(3)

    await playEvents()
    expect((await getMembers()).length).toEqual(3)

    done()
  })
})
