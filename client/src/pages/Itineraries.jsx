import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItineraryList from '../components/ItineraryList';
import { FETCH_ITINERARIES } from '../utils/mutations';
import { CircularProgress, Typography } from '@mui/material';

const Itineraries = () => {
  // Initialize state variables
  const [isLoading, setIsLoading] = useState(true);
  const [itineraries, setItineraries] = useState([]);
  const [aiResponse] = useMutation(FETCH_ITINERARIES);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  // Fun loading messages with placeholders
  const loadingMessages = [
    'Looking for fun things to do in {itLocation}...',
    'Finding great {itFoodPreference}...',
    'Planning a perfect {itCelebration} date...',
    'Checking the best {itInterests} spots...',
    'Curating your adventure...',
  ];

  // Function to replace placeholders with actual values
  const getLoadingMessages = (itLocation, itFoodPreference, itCelebration, itInterests) => {
    return loadingMessages.map((message) =>
      message
        .replace('{itLocation}', itLocation || 'your location')
        .replace('{itFoodPreference}', itFoodPreference || 'food')
        .replace('{itCelebration}', itCelebration || 'celebration')
        .replace('{itInterests}', itInterests || 'interest')
    );
  };

  // Initialize useLocation hook and store parameter values in location
  const location = useLocation();
  const formParams = location.state || {};

  // Set dynamic loading messages based on formParams
  useEffect(() => {
    if (Object.keys(formParams).length > 0) {
      const messages = getLoadingMessages(
        formParams.itLocation,
        formParams.itFoodPreferences,
        formParams.itCelebration,
        formParams.itInterests
      );

      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        setLoadingMessage(messages[messageIndex]);
        messageIndex = (messageIndex + 1) % messages.length;
      }, 3000); // Change every 3 seconds

      return () => clearInterval(messageInterval); // Clean up on component unmount
    }
  }, [formParams]);

  // useEffect hook to make API call when component is mounted
  useEffect(() => {
    // Ensure that the API call only happens if formParams has the necessary data
    if (Object.keys(formParams).length > 0) {
      const fetchItineraries = async () => {
        try {
          console.log(`itLocation:`, formParams.itLocation);
          console.log(`formParams: `, formParams);
          const { data } = await aiResponse({
            variables: {
              itDate: formParams.itDate,
              itLocation: formParams.itLocation,
              itCelebration: formParams.itCelebration,
              itFoodPreferences: formParams.itFoodPreferences,
              itSecondFoodPreference: formParams.itSecondFoodPreference,
              itInterests: formParams.itInterests,
              itTimeRange: formParams.itTimeRange,
            },
          });
          console.log(`data: `, JSON.parse(data.aiResponse.content));
          setItineraries(JSON.parse(data.aiResponse.content));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching itineraries:', error);
          setIsLoading(false); // Stop loading even if there's an error
        }
      };

      fetchItineraries();
    }
  }, [aiResponse, formParams]);

  // CSS for text darkening effect
  const textAnimationStyle = {
    background: 'linear-gradient(270deg, #000000 0%, #000000 50%, #999999 100%)',
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'textSlide 3s linear infinite',
  };

  // If isLoading is true, display spinner and loading message
  if (isLoading) {
    return (
      <div style={{ marginTop: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress size={100} />
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            textAlign: 'center',
            ...textAnimationStyle,
            '@keyframes textSlide': {
              '0%': { backgroundPosition: '200% 0' },
              '100%': { backgroundPosition: '0 0' },
            },
          }}
        >
          {loadingMessage}
        </Typography>
      </div>
    );
  }

  // Data has been retrieved, display the itinerary list
  return (
    <div>
      <ItineraryList itineraries={itineraries} />
    </div>
  );
};

export default Itineraries;
