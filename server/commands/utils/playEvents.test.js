import { getMembers } from '../../queries/queries'
import { playEvents } from './playEvents'
import addedMember from '../events/addedMember'
import db from '../../db/db'

const getEvents = async () => await db('events').select()

describe('playEvents', () => {
  test('plays all unplayed events', async done => {
    expect(await getEvents()).toHaveLength(0)
    expect(await getMembers()).toHaveLength(0)
    await addedMember(db, {
      displayName: 'Jan',
      slug: 'jan',
    })
    await addedMember(db, {
      displayName: 'Tom',
      slug: 'tom',
    })
    expect(await getEvents()).toHaveLength(2)
    expect(await getMembers()).toHaveLength(0)

    await playEvents()

    expect(await getEvents()).toHaveLength(2)
    expect(await getMembers()).toHaveLength(2)

    done()
  })
})
