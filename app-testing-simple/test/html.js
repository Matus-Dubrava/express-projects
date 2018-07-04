const supertest = require('supertest');
const cheerio = require('cheerio');

const app = require('../app');

describe('html response', () => {

  let request;
  beforeEach(() => {
    request = supertest(app)
      .get('/')
      .set('User-Agent', 'a cool browser')
      .set('Accept', 'text/html');
  });

  it('should return an HTML response', (done) => {
    request
      .expect('Content-Type', /html/)
      .expect(200)
      .end(done);
  });

  it('should return correct User-Agent', (done) => {
    request
      .expect((res) => {
        const htmlResponse = res.text;
        const $ = cheerio.load(htmlResponse);
        const userAgent = $('.user-agent').html().trim();
        if (userAgent !== 'a cool browser') {
          throw new Error('User agent not found');
        }
      })
      .end(done);
  });
});
