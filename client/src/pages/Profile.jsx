import { useState, useEffect } from 'react';
import { Typography, Button, Box, Alert, Container } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { STRIPE_PAYMENT } from '../utils/mutations';
import Auth from '../utils/auth';
import jwtDecode from 'jwt-decode';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [stripePayment] = useMutation(STRIPE_PAYMENT);

  useEffect(() => {
    // Get the token from local storage
    const token = Auth.getToken();
    if (token) {
      try {
        // Decode the token to extract user information
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);

        // Extract user data from the decoded token
        const userData = {
          id: decoded.data._id,
          username: decoded.data.username,
          isUpgraded: decoded.data.isUpgraded,
        };

        setUser(userData);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  console.log('User:', user);

  if (!user) return <p>Loading user data...</p>;

  const isUpgraded = user?.isUpgraded || false;

  const handleUpgrade = async () => {
    console.log('User before upgrade:', user); // Log the user object before proceeding
    if (!user?.id) {
      console.error('User ID is missing');
      return;
    }

    setIsLoading(true);
    const stripe = await stripePromise;

    try {
      // Call the mutation to create a checkout session with the correct userId
      const { data } = await stripePayment({ variables: { userId: user.id } });

      if (data && data.createCheckoutSession && data.createCheckoutSession.id) {
        const sessionId = data.createCheckoutSession.id;

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (error) {
          console.error('Stripe Checkout error:', error);
        }
      } else {
        console.error('No session ID returned from the mutation');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" align="center" gutterBottom>
          {user?.username ? `${user.username}'s Profile` : 'Your Profile'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Name:</strong> {user?.username || 'Name not available'}
        </Typography>
      </Box>

      {!isUpgraded ? (
        <Box sx={{ mt: 4 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Upgrade your account to unlock premium features and save your itineraries!
            </Typography>
          </Alert>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpgrade}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Upgrade'}
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Alert severity="success">
            <Typography variant="body2">
              Thank you for upgrading! You now have access to premium features.
            </Typography>
          </Alert>
        </Box>
      )}
    </Container>
  );
};

export default Profile;
