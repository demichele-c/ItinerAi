import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ItinerAi
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/itineraries" sx={{ mx: 1 }}>
            Itineraries
          </Button>
          <Button color="inherit" component={Link} to="/profile" sx={{ mx: 1 }}>
            Profile
          </Button>
          <Button color="inherit" component={Link} to="/login" sx={{ mx: 1 }}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
