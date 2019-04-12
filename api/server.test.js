const app = require('./server');
const request = require('supertest');

describe('Express app', () => {
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

    it('should respond with status code 200 on proper request', () => {
      return request(app)
        .post('/games')
        .send({
          title: 'Pacman', // required
          genre: 'Arcade', // required
          releaseYear: 1980, // not required
        })
        .expect(200);
    });

    it('will create new game', () => {
      const gameCreated = { message: 'Game created.' };
      return request(app)
        .post('/games')
        .send({
          title: 'Pacman', // required
          genre: 'Arcade', // required
          releaseYear: 1980, // not required
        })
        .expect(gameCreated);
    });
  });
});
