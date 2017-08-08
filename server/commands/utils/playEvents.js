import Promise from 'bluebird'

import db from '../../db/db'

const playAddedMember = event =>
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
  )

export const playEvent = event => {
  switch (event.type) {
    case 'addedMember':
      return playAddedMember(event)
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
