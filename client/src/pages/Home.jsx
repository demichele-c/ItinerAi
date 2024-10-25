import { Container, Typography, Box } from '@mui/material';
import UserInputForm from '../components/UserInputForm'; // Import the form

const Home = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: 10}}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
          Welcome to ItinerAi
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Plan your perfect date night effortlessly.
        </Typography>

        {/* Render UserInputForm */}
        <Box sx={{ mt: 4}}>
          <UserInputForm />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
