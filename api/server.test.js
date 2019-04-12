const app = require('./server');
const request = require('supertest');
const { db } = require('../data/dbQueries');

afterEach(async () => {
  await db('games').truncate();
});

describe('Express app', () => {
  it('is the right environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('[POST] /games endpoint', () => {
    it('should respond with 422 status code if required fields are missing in req.body', () => {
      return request(app)
        .post('/games')
        .send({
          title: 'Pacman', // required
          genre: null, // required
          releaseYear: 1980, // not required
        })
        .expect(422);
    });

    it('should respond with status code 200 on proper response', () => {
      return request(app)
        .post('/games')
        .send({
          title: 'Blabla', // required
          genre: 'Arcade', // required
          releaseYear: 1980, // not required
        })
        .expect(200);
    });

    it('will create new game', async () => {
      await request(app)
        .post('/games')
        .send({
          title: 'Pokemon', // required
          genre: 'Arcade', // required
          releaseYear: 1980, // not required
        });
      expect(/game created/i);
    });

    it('checks if game title is unique', async () => {
      await request(app)
        .post('/games')
        .send({
          title: 'Joker', // required
          genre: 'Cards', // required
        });
      await request(app)
        .post('/games')
        .send({
          title: 'Joker', // required
          genre: 'Cards', // required
        })
        .expect(/unique/);
    });
  });

  describe('[GET] /games endpoint', () => {
    it('responds with status code 200 on successful response', () => {
      return request(app)
        .get('/games')
        .expect(200);
    });

    it('returns an array', async () => {
      const gamesArr = await request(app).get('/games');
      await expect(Array.isArray(JSON.parse(gamesArr.text))).toBeTruthy();
    });

    it('has a JSON content type header', () => {
      return request(app)
        .get('/games')
        .expect('Content-Type', /json/i);
    });
  });
});
