import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: 10 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
          Welcome to ItinerAi
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Plan your perfect date night effortlessly.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/itineraries"
          sx={{ padding: '12px 24px', fontSize: '18px' }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
