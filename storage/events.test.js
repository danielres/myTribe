import {
  addMemberEvent,
  getEvents,
  playEvent,
  playEvents,
} from './events'
import { getMembers } from './queries'

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
    const entry = (await getEvents())[0]
    expect(entry.type).toEqual('addMember')
    expect(entry.attrs.slug).toEqual('jules')
    done()
  })
})

describe('playEvent', () => {
  test('plays the event, marks it as played', async done => {
    expect((await getEvents()).length).toEqual(0)
    expect((await getMembers()).length).toEqual(0)
    const attrs = {
      displayName: `Jules`,
      infos: {
        addedAt: new Date(),
      },
      invitedBy: null,
      slug: `jules`,
    }
    await addMemberEvent(attrs)
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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000

    expect((await getEvents()).length).toEqual(0)
    expect((await getMembers()).length).toEqual(0)
    const jan = { displayName: 'Jan', slug: 'jan' }
    await addMemberEvent(jan)
    expect((await getEvents()).length).toEqual(1)
    await playEvents()
    expect((await getMembers()).length).toEqual(1)

    const ted = { displayName: 'Ted', slug: 'ted' }
    const tom = { displayName: 'Tom', slug: 'tom' }
    await addMemberEvent(ted)
    await addMemberEvent(tom)
    expect((await getEvents()).length).toEqual(3)
    await playEvents()
    expect((await getMembers()).length).toEqual(3)

    done()
  })
})
