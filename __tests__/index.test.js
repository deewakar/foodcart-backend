const {app} = require('../index');
const request = require('supertest');

describe('testing GET /', () => {

  it("returns a hello world text", (done) => {
    const res = request(app).get('/')
          .send()
          .expect(200)
          .expect('Hello World!', done);
      });
});
