import { TextField, Button, Box, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

const Login = () => {
  const [tabValue, setTabValue] = useState(0);  // 0 for login, 1 for register

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {tabValue === 0 ? 'Login' : 'Register'}
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 3 }}>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      <Box component="form" onSubmit={handleSubmit}>
        {tabValue === 1 && (
          <TextField label="Name" fullWidth margin="normal" />
        )}
        <TextField label="Email" type="email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
          {tabValue === 0 ? 'Login' : 'Register'}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
