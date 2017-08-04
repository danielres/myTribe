import Promise from 'bluebird'

import db from '../db'

const playAddMemberEvent = event =>
  db.transaction(tx =>
    db('members')
      .transacting(tx)
      .insert(event.attrs)
      .then(() =>
        db('events')
          .transacting(tx)
          .where('id', '=', event.id)
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

export const playEvents = () =>
  db('events')
    .where({ isPlayed: false })
    .orderBy('createdAt', 'asc')
    .then(events => Promise.all(events.map(playEvent)))
    .catch(console.error)
