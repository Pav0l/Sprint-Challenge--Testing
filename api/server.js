const express = require('express');
const DB = require('../data/dbQueries');
const app = express();

app.use(express.json());

app.post('/games', async (req, res) => {
  const { title, genre, releaseYear } = req.body;

  if (title && genre) {
    try {
      const addNewGame = await DB.insert({ title, genre, releaseYear });
      res.status(200).json({ message: 'Game created.', newGame: addNewGame });
    } catch (error) {
      if (error.errno === 19) {
        res.status(405).json({ error: 'Game Title must be unique' });
      } else {
        res.status(500).json({ error });
      }
    }
  } else {
    res.status(422).json({ message: 'Missing game title or genre.' });
  }
});

app.get('/games', async (req, res) => {
  try {
    const listOfGames = await DB.getAll();
    res.status(200).json(listOfGames);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = app;
