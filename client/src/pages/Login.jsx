import { TextField, Button, Box, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE, LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
const Login = () => {
  const [tabValue, setTabValue] = useState(0); // 0 for login, 1 for register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setuserName] = useState('');

  const [addProfile, { error1, data1 }] = useMutation(ADD_PROFILE);
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      email,
      password,
    };
    if (tabValue === 0) {
      try {
        const { data } = await login({
          variables: { ...userDetails },
        });

        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
    } else {
      userDetails.username = username;
      userDetails.name = name;
      console.log(userDetails);
      try {
        const res = await addProfile({
          variables: { ...userDetails },
        });
        console.log(`Data1: ${res}`);
        Auth.login(res.data.addProfile.token);
      } catch (e) {
        console.error(e);
      }
    }
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
          <>
            <TextField value={name} onChange={(e) => setName(e.target.value)} label="Name" fullWidth margin="normal" />
            <TextField value={username} onChange={(e) => setuserName(e.target.value)} label="Username" fullWidth margin="normal" />
          </>
        )}
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" type="email" fullWidth margin="normal" />
        <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
          {tabValue === 0 ? 'Login' : 'Register'}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
