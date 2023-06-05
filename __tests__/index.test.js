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

describe('testing POST api/orderHistory', () => {
  it('should fetch the order history', async () => {
    const res = await request(app).post('/api/orderHistory')
          .send({'email': 'vikas77@gmail.com'})
          .expect(200)
      });
  });
