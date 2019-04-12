const express = require('express');
const app = express();

app.use(express.json());

app.post('/games', async (req, res) => {
  const { title, genre } = req.body;

  if (title && genre) {
    try {
      res.status(200).json({ message: 'Game created.' });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(422).json({ message: 'Missing game title or genre.' });
  }
});

app.get('/games', async (req, res) => {
  try {
    res.status(200).json([
      {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980, // not required
      },
    ]);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = app;
