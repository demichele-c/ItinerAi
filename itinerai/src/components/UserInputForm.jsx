import { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';

const UserInputForm = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [celebration, setCelebration] = useState('');
  const [interests, setInterests] = useState('');
  const [foodPreferences, setFoodPreferences] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, boxShadow: 2, borderRadius: 2, maxWidth: 500, mx: 'auto', mt: 5 }}>
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
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
      />
      <TextField
        label="Celebration"
        value={celebration}
        onChange={(e) => setCelebration(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Interests"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Food Preferences"
        value={foodPreferences}
        onChange={(e) => setFoodPreferences(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        select
      >
        <MenuItem value="Vegan">Vegan</MenuItem>
        <MenuItem value="Vegetarian">Vegetarian</MenuItem>
        <MenuItem value="Seafood">Seafood</MenuItem>
        <MenuItem value="Steakhouse">Steakhouse</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
        Generate Itinerary
      </Button>
    </Box>
  );
};

export default UserInputForm;  // Ensure the component is exported
