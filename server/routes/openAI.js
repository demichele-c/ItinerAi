const chat = require('express').Router();

chat.get('/', (req, res) => {
  res.send('OpenAI Route Working!');
});

module.exports = chat;
