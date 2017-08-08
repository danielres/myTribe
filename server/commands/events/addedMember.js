import db from '../../db/db'

export default attrs =>
  db('events').insert({ type: 'addedMember', attrs })
