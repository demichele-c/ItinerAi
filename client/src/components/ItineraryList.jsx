import convertDateFormat from '../utils/formatDate';
import { Box, Typography, List, Divider, Card, CardContent, CardActionArea, IconButton } from '@mui/material';
import { DEL_SINGLE_ACTIVITY } from '../utils/mutations';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, grey } from '@mui/material/colors';

const ItineraryList = ({ itineraries }) => {
  if (!itineraries) {
    return null;
  }

  const onDeleteActivity = async (itineraryId, activityName) => {
    try {
      await deleteActivity({
        variables: {
          itineraryId,
          activityName,
        },
      });
      setIsDeleted(true); // Trigger the cache clear and refetch
    } catch (err) {
      console.error('Error deleting activity:', err);
    }
  };

  // Destructure itinerary details
  const { city, date, icon, time_frame, activities, dining_options } = itineraries;
  const newDate = convertDateFormat(date);

  return (
    <Box sx={{ p: 3 }}>
      {/* Itinerary Details */}
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Itinerary for {city}{icon}
      </Typography>
      {date && date !== 'N/A' && (
        <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
          Date: {newDate}
        </Typography>
      )}
      {time_frame && time_frame !== 'N/A' && (
        <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
          Time Frame: {time_frame}
        </Typography>
      )}
      <Divider sx={{ my: 3 }} />

      {/* Activities */}
      {activities && activities.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Activities
          </Typography>
          <List>
            {activities.map((activity, index) => (
              <Card key={index} sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      <a
                        href={activity.website && activity.website !== 'N/A' ? activity.website : '#dining-options'}
                        target={activity.website && activity.website !== 'N/A' ? '_blank' : '_self'}
                        rel={activity.website && activity.website !== 'N/A' ? 'noopener noreferrer' : undefined}
                        style={{ color: '#1976d2', textDecoration: 'none' }}
                        onMouseEnter={(e) => (e.target.style.color = '#1565c0')}
                        onMouseLeave={(e) => (e.target.style.color = '#1976d2')}
                      >
                        {activity.name}
                      </a>
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      {activity.time_frame}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {activity.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {activity.address && activity.address !== 'N/A' ? `Address: ${activity.address}` : <></>}
                    </Typography>
                    {activity.link && activity.link !== 'N/A' && (
                      <Typography component="div" variant="body2" sx={{ mt: 1 }}>
                        📍{' '}
                        <a href={activity.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                          Apple Maps Location
                        </a>
                      </Typography>
                    )}
                  </CardContent>
                  <IconButton aria-label="delete-activity" onClick={() => onDeleteActivity(activity.name)} sx={{ color: red[500] }}>
                    {' '}
                    <DeleteIcon />
                  </IconButton>
                </CardActionArea>
              </Card>
            ))}
          </List>
          <Divider sx={{ my: 3 }} />
        </>
      )}

      {/* Dining Options */}
      {dining_options && dining_options.length > 0 && (
        <>
          <Typography id="dining-options" variant="h5" gutterBottom>
            Dining Options
          </Typography>
          {dining_options.map((restaurant, index) => (
            <Card key={index} sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#1565c0')}
                    onMouseLeave={(e) => (e.target.style.color = '#1976d2')}
                  >
                    {restaurant.name}
                  </a>
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {restaurant.rating}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {restaurant.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Address: {restaurant.address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Phone: {restaurant.phone}
                </Typography>
                {restaurant.link && restaurant.link !== 'N/A' && (
                  <Typography component="div" variant="body2" sx={{ mt: 1 }}>
                    📍{' '}
                    <a href={restaurant.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                      Apple Maps Location
                    </a>
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
};

export default ItineraryList;
