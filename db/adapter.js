import pg from 'pg'

const config = {
  user: process.env.PGUSER,
  database: process.env.PGDB,
  password: process.env.PGPASSWORD,
  host: 'db',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config)

pool.on('error', (err, client) => {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})

//export the query method for passing queries to the pool
export const query = (text, values, callback) => {
  return pool.query(text, values, callback)
}

// the pool also supports checking out a client for
// multiple operations, such as a transaction
export const connect = (callback) => {
  return pool.connect(callback)
}
