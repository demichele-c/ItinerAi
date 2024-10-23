import formatDate from '../utils/formatDate';
import { Box, Typography, List, Divider } from '@mui/material';

const ItineraryList = ({ itineraries }) => {
  if (!itineraries) {
    return null;
  }

  // Destructure itinerary details
  const { city, date, time_frame, activities, dining_options } = itineraries;
  const newDate = formatDate(date);

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      {/* Itinerary Details */}
      <Typography variant="h4" gutterBottom>
        Itinerary for {city}
      </Typography>
      {date && date !== 'N/A' && (
        <Typography variant="subtitle1" gutterBottom>
          Date: {newDate}
        </Typography>
      )}
      {time_frame && time_frame !== 'N/A' && (
        <Typography variant="subtitle1" gutterBottom>
          Time Frame: {time_frame}
        </Typography>
      )}
      <Divider sx={{ my: 2 }} />

      {/* Activities */}
      {activities && activities.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Activities
          </Typography>
          <List>
            {activities.map((activity, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{activity.name}</Typography>
                <Typography variant="body1">{activity.description}</Typography>
                <Typography variant="body2">Address: {activity.address}</Typography>
                {activity.link && activity.link !== 'N/A' && (
                  <Typography component="div" variant="body2">
                    📍 <a href={activity.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>Apple Maps Location</a>
                  </Typography>
                )}
              </Box>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Dining Options */}
      {dining_options && dining_options.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Dining Options
          </Typography>
          {dining_options.map((restaurant, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="h6">{restaurant.name}</Typography>
              <Typography variant="body1">{restaurant.description}</Typography>
              <Typography variant="body2">Address: {restaurant.address}</Typography>
              <Typography variant="body2">Phone: {restaurant.phone}</Typography>
              {restaurant.link && restaurant.link !== 'N/A' && (
                <Typography component="div" variant="body2">
                  📍 <a href={restaurant.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>Apple Maps Location</a>
                </Typography>
              )}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default ItineraryList;
