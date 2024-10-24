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

  // Fun loading messages
  const loadingMessages = [
    'Looking for fun things to do...',
    'Finding great food...',
    'Planning a perfect date...',
    'Checking the best spots...',
    'Curating your adventure...',
  ];

  // Change the loading message every few seconds
  useEffect(() => {
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      setLoadingMessage(loadingMessages[messageIndex]);
      messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 3000); // Change every 3 seconds

    return () => clearInterval(messageInterval); // Clean up on component unmount
  }, []);

  // Initialize useLocation hook and store parameter values in location
  const location = useLocation();
  const formParams = location.state || {};

  // useEffect hook to make API call when component is mounted
  useEffect(() => {
    const fetchItineraries = async () => {
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
    };

    fetchItineraries();
  }, []);

  // If isLoading is true, display spinner and loading message
  if (isLoading) {
    return (
      <div style={{ marginTop: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress size={100} />
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center', color: 'gray' }}>
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
