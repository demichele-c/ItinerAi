// Import Axiox to make API calls (data retrieval)
//import axios from 'axios';

// Import React Hooks
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Import component for rendering itinerary list
import ItineraryList from '../components/ItineraryList';

import { CircularProgress } from '@mui/material';

const Itineraries = () => {
  // Conditional For Loading Page Spinner
  const [isLoading, setIsLoading] = useState(true);
  const [itineraries, setItineraries] = useState([]);

  // Initialize useLocation hook and store parameter values in location
  const location = useLocation();
  const formParams = location.state || {};

  console.log(formParams.location, formParams.date, formParams.celebration, formParams.interests, formParams.foodPreferences);
  const itLocaton = formParams.location;
  const itDate = formParams.date;
  const itCelebration = formParams.celebration;
  const itInterests = formParams.interests;
  const itFoodPreferences = formParams.foodPreferences;

  if (isLoading) {
    return (
      <>
        <CircularProgress size={50} />
      </>
    );
  } else {
    return (
      <div>
        <ItineraryList />
      </div>
    );
  }
};

export default Itineraries;
