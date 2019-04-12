const { db, getAll, insert } = require('./dbQueries');

beforeEach(async () => {
  await db('games').truncate();
});

afterEach(async () => {
  await db('games').truncate();
});

describe('DB queries', () => {
  it('is the right environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('Insert ', () => {
    it('inserts game into db', async () => {
      const newGame = await insert({
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980, // not required
      });
      expect(newGame.title).toBe('Pacman');
    });
  });

  describe('Get all', () => {
    it('fetches all games from db', async () => {
      const allGamesFromQuery = await getAll;
      const allGamesFromDb = await db('games');
      expect(allGamesFromQuery.length).toBe(allGamesFromDb.length);
    });
  });
});
