import db from '../../db/db'

export default done =>
  db.migrate.rollback().then(() => db.migrate.latest()).then(done)
