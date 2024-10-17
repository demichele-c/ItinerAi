// import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';

const ItineraryCard = ({ name, address, phone, description }) => (
  <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
    <CardContent>
      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {address}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {phone}
      </Typography>
    </CardContent>
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Button variant="outlined" color="primary">
        Save Itinerary
      </Button>
    </Box>
  </Card>
);

// ItineraryCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
// };

const ItineraryList = ({ itineraries }) => {
  // const sampleItineraries = [
  //   { title: 'Romantic Dinner', description: 'Dinner at a fine dining restaurant.' },
  //   { title: 'Movie Night', description: 'Watch a romantic movie at the local cinema.' },
  // ];

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {/* <h3>City: {itineraries?.city}</h3> */}
      {itineraries?.recommendations?.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ItineraryCard name={item.name} description={item.description} address={item.address} phone={item.phone} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItineraryList;
