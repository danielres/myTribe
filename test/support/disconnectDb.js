import Promise from 'bluebird'

import db from '../../db/db'

export default done => {
  console.log('disconnecting from DB')
  return db.destroy()
}
