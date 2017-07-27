import db from './db'

console.log(process.env.NODE_ENV)

it('connects', () => {
  db.raw('select 1+1 as result').then(() => {
    // there is a valid connection in the pool
  })
})
