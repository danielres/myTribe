import { addMemberEvent, getEvents } from './events'

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
