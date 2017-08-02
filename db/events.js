import db from './db'

const playAddMemberEvent = event =>
  db.transaction(tx =>
    db('members')
      .transacting(tx)
      .insert(event.attrs)
      .then(() =>
        db('events')
          .transacting(tx)
          .where('uuid', '=', event.uuid)
          .update({ isPlayed: true })
      )
      .then(tx.commit)
      .catch(tx.rollback)
  )

export const playEvent = event => {
  switch (event.type) {
    case 'addMember':
      return playAddMemberEvent(event)
      break
    default:
      break
  }
}

export const addMemberEvent = attrs =>
  db.insert({ type: 'addMember', attrs }).into('events')

export const getEvents = () =>
  db.transaction(tx => tx.select().from('events'))
