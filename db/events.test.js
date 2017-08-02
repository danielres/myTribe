import { addMemberEvent, getEvents, playEvent } from './events'
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
