import db from '../db'

export default attrs =>
  db('events').insert({ type: 'addedMember', attrs })
