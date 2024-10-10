const chat = require('express').Router();

chat.get('/', (req, res) => {
  res.send('ChatGPT GET Working!');
});

module.exports = chat;
