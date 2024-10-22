import { useQuery, useMutation } from '@apollo/client';
import { SAVED_ITINERARIES } from '../utils/queries';
import { DEL_SINGLE_ITINERARY } from '../utils/mutations';
import { useEffect } from 'react';

import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Card,
  CardContent,
  IconButton,
  Grid,
  Box,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, grey } from '@mui/material/colors';

const SavedItineraries = () => {
  const { loading, data, refetch } = useQuery(SAVED_ITINERARIES);
  const itineraries = data?.myItineraries || [];
  const [deleteItinerary] = useMutation(DEL_SINGLE_ITINERARY);

  useEffect(() => {
    if (data && !loading) {
      console.log('Data received:', data);
      refetch();
    }
  }, [data, loading]);

  const handleDeleteItinerary = async (id) => {
    try {
      await deleteItinerary({
        variables: { deleteItineraryId: id },
      });
      refetch();
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
        <Typography
          variant="h4"
          sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, textAlign: 'center' }}
        >
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
              },
              '&:hover': {
                backgroundColor: grey[400],
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ width: '33%', flexShrink: 0, fontFamily: 'Roboto, sans-serif' }}
            >
              {itinerary.city}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                width: '60%',
                flexShrink: 0,
                fontFamily: 'Roboto, sans-serif',
                color: 'text.secondary',
              }}
            >
              {itinerary.date}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 3 }}>
            <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}>
              Activities:
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              {itinerary.activities.map((activity) => (
                <Grid item xs={12} key={activity.name}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif' }}>{activity.name}</Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: 'text.secondary' }}>{activity.description}</Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: 'text.secondary' }}>{activity.address}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}>
              Dining Options:
            </Typography>
            <Grid container spacing={2}>
              {itinerary.dining_options.map((diningOption) => (
                <Grid item xs={12} key={diningOption.name}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif' }}>{diningOption.name}</Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: 'text.secondary' }}>{diningOption.description}</Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: 'text.secondary' }}>{diningOption.address}</Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: 'text.secondary' }}>{diningOption.phone}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
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

// const SavedItineraries = () => {
//   const { loading, data } = useQuery(SAVED_ITINERARIES);
//   const itineraries = data?.myItineraries || [];

//   const [deleteItinerary] = useMutation(DEL_SINGLE_ITINERARY);

//   function handleDeleteItinerary(id) {
//     deleteItinerary({
//       variables: { deleteItineraryId: id },
//     });
//     window.location.reload();
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4">Saved Itineraries</Typography>
//       <div>
//         {itineraries.map((itinerary) => (
//           <Accordion key={itinerary.id}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6" sx={{ width: '33%', flexShrink: 0 }}>
//                 {itinerary.city}
//               </Typography>
//               <Typography variant="h6" sx={{ width: '60%', flexShrink: 0 }}>
//                 {itinerary.date}
//               </Typography>
//             </AccordionSummary>

//             <AccordionDetails>
//               <ul>
//                 {itinerary.activities.map((activity) => (
//                   <li key={activity.name}>
//                     <Typography variant="body1">{activity.name}</Typography>
//                     <Typography variant="body2">{activity.description}</Typography>
//                     <Typography variant="body2">{activity.address}</Typography>
//                   </li>
//                 ))}
//               </ul>
//               <ul>
//                 {itinerary.dining_options.map((diningOption) => (
//                   <li key={diningOption.name}>
//                     <Typography variant="body1">{diningOption.name}</Typography>
//                     <Typography variant="body2">{diningOption.description}</Typography>
//                     <Typography variant="body2">{diningOption.address}</Typography>
//                     <Typography variant="body2">{diningOption.phone}</Typography>
//                   </li>
//                 ))}
//               </ul>
//             </AccordionDetails>
//             <AccordionActions>
//               <Button onClick={() => handleDeleteItinerary(itinerary.id)}>Delete</Button>
//             </AccordionActions>
//           </Accordion>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default SavedItineraries;
