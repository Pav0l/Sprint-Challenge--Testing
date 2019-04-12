const knex = require('knex');
const knexConfig = require('../knexfile');

const dbEnv = process.env.DB_ENV || 'development';

const db = knex(knexConfig[dbEnv]);

async function insert(game) {
  const [id] = await db('games').insert(game);
  return await db('games')
    .where({ id })
    .first();
}

function getAll() {
  return db('games');
}

module.exports = {
  insert,
  getAll,
};
