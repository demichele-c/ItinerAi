const chat = require('express').Router();

chat.get('/', (req, res) => {
  axios
    .post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.7,
        n: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_API_KEY`, // Replace 'YOUR_API_KEY' with your actual API key
        },
      }
    )
    .then((response) => {
      const recommendationText = response.data.choices[0].text.trim();
      res.json({ recommendation: recommendationText });
    })
    .catch((error) => {
      console.error('Error fetching recommendation: ', error);
      res.status(500).json({ error: 'An error occurred. Please try again.' });
    });
});

module.exports = chat;
