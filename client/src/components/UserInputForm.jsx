// Import the react hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth.js'
//import { useMutation } from '@apollo/client';

// Import the Material-UI components
import { TextField, Button, Box, MenuItem, Slider, Typography } from '@mui/material';

// Function to convert slider value to time in 12-hour format
const formatTime = (value) => {
  const hour = value % 24;
  const isAM = hour < 12 || hour === 24;
  const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const suffix = isAM ? 'AM' : 'PM';
  return `${formattedHour}:00 ${suffix}`;
};

const UserInputForm = ({ children }) => {
  // Initialize the navigate hook
  const navigate = useNavigate();

  // Initialize state variables
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [celebration, setCelebration] = useState('');
  const [interests, setInterests] = useState('');
  const [foodPreferences, setFoodPreferences] = useState('');
  const [timeRange, setTimeRange] = useState([0, 24]); // Time range from 12 AM to 12 AM next day

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format the timeRange into a string
    const formattedTimeRange = `between ${formatTime(timeRange[0])} and ${formatTime(timeRange[1])}`;
    navigate('/itineraries', {
      state: {
        itLocation: location,
        itDate: date,
        itCelebration: celebration,
        itInterests: interests,
        itFoodPreferences: foodPreferences,
        itTimeRange: formattedTimeRange,
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, boxShadow: 2, borderRadius: 2, maxWidth: 500, mx: 'auto', mt: 5 }}>
      <TextField
        label="Location (City, State)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
        placeholder="e.g., New York, NY"
      />

      {/* Date Picker */}
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        required
      />

      {/* Celebration Dropdown */}
      <TextField
        label="Celebration"
        value={celebration}
        onChange={(e) => setCelebration(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        select
        required
      >
        <MenuItem value="Birthday">Birthday</MenuItem>
        <MenuItem value="Anniversary">Anniversary</MenuItem>
        <MenuItem value="Engagement">Engagement</MenuItem>
        <MenuItem value="Just Because">Just Because</MenuItem>
        <MenuItem value="First Date">First Date</MenuItem>
      </TextField>

      {/* Interests Dropdown */}
      <TextField
        label="Interests"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        select
        required
      >
        <MenuItem value="Art">Art</MenuItem>
        <MenuItem value="Music">Music</MenuItem>
        <MenuItem value="Sports">Sports</MenuItem>
        <MenuItem value="Nature">Nature</MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Movies">Movies</MenuItem>
        <MenuItem value="Theater">Theater</MenuItem>
        <MenuItem value="Shopping">Shopping</MenuItem>
        <MenuItem value="Hiking">Hiking</MenuItem>
        <MenuItem value="Fitness">Fitness</MenuItem>
        <MenuItem value="Spa">Spa</MenuItem>
        <MenuItem value="Gaming">Gaming</MenuItem>
        <MenuItem value="Photography">Photography</MenuItem>
        <MenuItem value="Books">Books</MenuItem>
        <MenuItem value="History">History</MenuItem>
      </TextField>

      {/* Food Preferences Dropdown */}
      <TextField
        label="Food Preferences"
        value={foodPreferences}
        onChange={(e) => setFoodPreferences(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        select
        required
      >
        <MenuItem value="Vegan">Vegan</MenuItem>
        <MenuItem value="Indian">Indian</MenuItem>
        <MenuItem value="Seafood">Seafood</MenuItem>
        <MenuItem value="Steakhouse">Steakhouse</MenuItem>
        <MenuItem value="Italian">Italian</MenuItem>
        <MenuItem value="Japanese">Japanese</MenuItem>
        <MenuItem value="Mexican">Mexican</MenuItem>
        <MenuItem value="Chinese">Chinese</MenuItem>
        <MenuItem value="French">French</MenuItem>
        <MenuItem value="Thai">Thai</MenuItem>
        <MenuItem value="Greek">Greek</MenuItem>
        <MenuItem value="BBQ">BBQ</MenuItem>
        <MenuItem value="Pizza">Pizza</MenuItem>
        <MenuItem value="Mediterranean">Mediterranean</MenuItem>
        <MenuItem value="Burgers">Burgers</MenuItem>
      </TextField>

      {/* Time Range Slider */}
      <Typography gutterBottom>Date Time Frame</Typography>
      <Slider
        value={timeRange}
        onChange={(e, newValue) => setTimeRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={24}
        step={1}
        marks
        valueLabelFormat={formatTime}
      />
      <Typography>
        From {formatTime(timeRange[0])} to {formatTime(timeRange[1])}
      </Typography>

      {/* Submit Button */}
      {AuthService.loggedIn() ? 
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
          Generate Itinerary
        </Button>
        : <Button variant="contained" color="primary" type="button" fullWidth sx={{ mt: 3 }} onClick={() => navigate('/login')}>
          Please Log In or Register To Make an Itinerary
        </Button>
      }
    </Box>
  );
};

export default UserInputForm;
