import axios from 'axios';
import { useState } from 'react';

const DinnerRecommendation = () => {
  const [location, setLocation] = useState('Port Saint Lucie');
  const [cuisineType, setCuisineType] = useState('Italian');
  const [diningType, setDiningType] = useState('casual');
  const [recommendation, setRecommendation] = useState('');

  const fetchRecommendation = () => {
    const prompt = `I am in ${location} and I'm looking for a place to have ${cuisineType} food. 
    I'm interested in a ${diningType} dining experience. Could you give me a recommendation?`;

    axios
      .post(
        // 'https://api.openai.com/v1/engines/text-davinci-003/completions',
        'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
        {
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.7,
          n: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer OPENAIKEY_HERE`, // Replace 'YOUR_API_KEY' with your actual API key
          },
        }
      )
      .then((response) => {
        const recommendationText = response.data.choices[0].text.trim();
        setRecommendation(recommendationText);
      })
      .catch((error) => {
        console.error('Error fetching recommendation: ', error);
        setRecommendation('An error occurred. Please try again.');
      });
  };

  return (
    <div>
      <h1>Dinner Recommendation</h1>
      <button onClick={fetchRecommendation}>Get Recommendation</button>
      <p>{recommendation}</p>
    </div>
  );
};

export default DinnerRecommendation;
