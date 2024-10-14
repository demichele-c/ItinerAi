// Import Axiox to make API calls (data retrieval)
import axios from 'axios';

// Import React Hooks
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Import component for rendering itinerary list
import ItineraryList from '../components/ItineraryList';

// Import Material-UI components
import { CircularProgress } from '@mui/material';

const Itineraries = () => {
  // Initialize state variables
  const [isLoading, setIsLoading] = useState(true);
  const [itineraries, setItineraries] = useState([]);

  // Initialize useLocation hook and store parameter values in location
  const location = useLocation();
  const formParams = location.state || {};

  // Create variables to store the form parameters
  const itLocation = formParams.location;
  console.log(`itLocation: ${itLocation}`);
  //console.log(`formParams: `, formParams);
  // const itDate = formParams.date;
  // const itCelebration = formParams.celebration;
  // const itInterests = formParams.interests;
  // const itFoodPreferences = formParams.foodPreferences;

  // useEffect hook to make API call when component is mounted
  useEffect(() => {
    const fetchItineraries = async () => {
      const openAiRes = await axios.get(`/openAI?itLocation=${itLocation}`);
      //const openAiRes = await axios.get('/openAI?itLocation=$itLoaction', { params: { itLocation: itLocation } });
      //setItineraries(openAiRes.data);
      console.log(`openAi_Response: `, openAiRes.data);
    };

    fetchItineraries();
    setIsLoading(false);
    //console.log(itineraries);
  }, []);

  // If isLoading is true, display spinner while waiting for data
  if (isLoading) {
    return (
      <>
        <CircularProgress size={50} />
      </>
    );
  }
  // Data has been retrieved, display the itinerary list
  else {
    return (
      <div>
        <ItineraryList />
      </div>
    );
  }
};

export default Itineraries;
