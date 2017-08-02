import db from './db'

export const addMemberEvent = attrs =>
  db.insert({ type: 'addMember', attrs }).into('events')

export const getEvents = () =>
  db.transaction(tx => tx.select().from('events'))
