import { useQuery, useMutation } from '@apollo/client';

import { SAVED_ITINERARIES } from '../utils/queries';
import { DEL_SINGLE_ITINERARY } from '../utils/mutations';

import { Button, Container, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';

const SavedItineraries = () => {
  const { loading, data } = useQuery(SAVED_ITINERARIES);
  const itineraries = data?.myItineraries || [];

  const [deleteItinerary] = useMutation(DEL_SINGLE_ITINERARY);

  function handleDeleteItinerary(id) {
    deleteItinerary({
      variables: { deleteItineraryId: id },
    });
    window.location.reload();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4">Saved Itineraries</Typography>
      <div>
        {itineraries.map((itinerary) => (
          <Accordion key={itinerary.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ width: '33%', flexShrink: 0 }}>
                {itinerary.city}
              </Typography>
              <Typography variant="h6" sx={{ width: '60%', flexShrink: 0 }}>
                {itinerary.date}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <ul>
                {itinerary.activities.map((activity) => (
                  <li key={activity.name}>
                    <Typography variant="body1">{activity.name}</Typography>
                    <Typography variant="body2">{activity.description}</Typography>
                    <Typography variant="body2">{activity.address}</Typography>
                  </li>
                ))}
              </ul>
              <ul>
                {itinerary.dining_options.map((diningOption) => (
                  <li key={diningOption.name}>
                    <Typography variant="body1">{diningOption.name}</Typography>
                    <Typography variant="body2">{diningOption.description}</Typography>
                    <Typography variant="body2">{diningOption.address}</Typography>
                    <Typography variant="body2">{diningOption.phone}</Typography>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
            <AccordionActions>
              <Button onClick={() => handleDeleteItinerary(itinerary.id)}>Delete</Button>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
    </Container>
  );
};

export default SavedItineraries;
