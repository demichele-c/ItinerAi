import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { SAVED_ITINERARIES } from '../utils/queries';
import { DEL_SINGLE_ITINERARY, DEL_SINGLE_ACTIVITY } from '../utils/mutations';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  IconButton,
  Box,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, grey } from '@mui/material/colors';
import ItineraryList from '../components/ItineraryList';

const SavedItineraries = () => {
  const client = useApolloClient();
  const { loading, data, refetch } = useQuery(SAVED_ITINERARIES);
  const itineraries = data?.myItineraries || [];
  const [deleteItinerary] = useMutation(DEL_SINGLE_ITINERARY);
  const [deleteActivity, { loading: deleteLoading, error: deleteError }] = useMutation(DEL_SINGLE_ACTIVITY);

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (data && !loading) {
      console.log('Data received:', data);
      refetch();
    }
  }, [data, loading, refetch]);

  useEffect(() => {
    if (isDeleted) {
      client.clearStore().then(() => {
        refetch(); // Refetch the itineraries after clearing cache
        setIsDeleted(false); // Reset the state
      });
    }
  }, [isDeleted, client, refetch]);

  const handleDeleteItinerary = async (id) => {
    try {
      await deleteItinerary({
        variables: { deleteItineraryId: id },
      });
      setIsDeleted(true); // Trigger the cache clear and refetch
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  const handleDeleteActivity = async (itineraryId, activityName) => {
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5" color="textSecondary">
          Loading your saved adventures...
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 3,
          backgroundColor: grey[100],
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Typography variant="h4" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, textAlign: 'center' }}>
          Saved Itineraries
        </Typography>
      </Paper>
      {itineraries.map((itinerary) => (
        <Accordion
          key={itinerary.id}
          sx={{
            backgroundColor: grey[100],
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            '&:before': { display: 'none' },
            marginBottom: 2,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: grey[700] }} />}
            aria-controls="panel-content"
            id={`panel-${itinerary.id}`}
            sx={{
              backgroundColor: grey[300],
              borderRadius: 2,
              '& .MuiAccordionSummary-content': {
                alignItems: 'center',
                display: 'flex',
              },
              '&:hover': {
                backgroundColor: grey[400],
              },
            }}
          >
            {itinerary.icon && (
              <Box component="span" sx={{ mr: 1, fontSize: '1.5rem' }}>
                {itinerary.icon} {/* Display the emoji or icon here */}
              </Box>
            )}
            <Typography variant="h6" sx={{ flexShrink: 0, fontFamily: 'Roboto, sans-serif' }}>
              {itinerary.city}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginLeft: 'auto',
                flexShrink: 0,
                fontFamily: 'Roboto, sans-serif',
                color: 'text.secondary',
              }}
            >
              {itinerary.date}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 3 }}>
            <ItineraryList itineraries={itinerary} />
          </AccordionDetails>
          <AccordionActions>
            <Box sx={{ marginLeft: 'auto' }}>
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteItinerary(itinerary.id)}
                sx={{ color: red[500] }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionActions>
        </Accordion>
      ))}
    </Container>
  );
};

export default SavedItineraries;
