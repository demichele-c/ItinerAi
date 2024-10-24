import { useMutation } from '@apollo/client';

// Import React Hooks
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Import components
import ItineraryList from '../components/ItineraryList';
import { FETCH_ITINERARIES } from '../utils/mutations';

// Import Material-UI components
import { CircularProgress } from '@mui/material';

const Itineraries = () => {
  // Initialize state variables
  const [isLoading, setIsLoading] = useState(true);
  const [itineraries, setItineraries] = useState([]);
  const [aiResponse] = useMutation(FETCH_ITINERARIES);

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

  // If isLoading is true, display spinner while waiting for data
  if (isLoading) {
    return (
      <div style={{ marginTop: '200px', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={100} />
      </div>
    );
  }

  // Data has been retrieved, display the itinerary list
  else {
    return (
      <div>
        <ItineraryList itineraries={itineraries} />
      </div>
    );
  }
};

export default Itineraries;
