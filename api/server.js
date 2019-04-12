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

module.exports = app;
