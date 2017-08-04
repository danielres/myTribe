import server from './server'

var request = require('supertest')

describe('api', () => {
  afterEach(done => server.close(done))

  test('POST /api/members + GET /api/members + GET /api/members/:slug', done => {
    const app = request(server)
    app
      .post('/api/members')
      .expect(200)
      .then(resp => expect(resp.body).toHaveLength(1))
      .then(() =>
        app
          .get('/api/members')
          .expect(200)
          .then(resp => {
            expect(resp.body).toHaveLength(1)
            return resp.body[0].slug
          })
          .then(slug => app.get(`/api/members/${slug}`))
          .then(resp => {
            expect(resp.body).toHaveProperty('slug')
            expect(resp.body).toHaveProperty('displayName')
          })
          .then(done)
      )
  })

  test('POST /api/members + GET /api/log + GET /api/log/:id', done => {
    const app = request(server)
    app
      .post('/api/members')
      .expect(200)
      .then(resp => {
        expect(resp.body).toHaveLength(1)
      })
      .then(() =>
        app
          .get('/api/log')
          .expect(200)
          .then(resp => {
            expect(resp.body).toHaveLength(1)
            return resp.body[0].id
          })
          .then(id => app.get(`/api/log/${id}`))
          .then(resp => {
            expect(resp.body).toHaveProperty('id')
            expect(resp.body).toHaveProperty('attrs')
          })
          .then(done)
      )
  })
})
