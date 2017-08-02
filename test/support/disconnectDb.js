import Promise from 'bluebird'

import db from '../../db/db'

export default done => db.destroy()
