
import { useState, useEffect } from 'react';

import { Typography, Button, Box, Alert, Container } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';

import { STRIPE_PAYMENT, CONFIRM_UPGRADE } from '../utils/mutations';
import AuthService from '../utils/auth';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [stripePayment] = useMutation(STRIPE_PAYMENT);
  const [confirmUpgrade] = useMutation(CONFIRM_UPGRADE);

  // Fetch the user from AuthService and use the _id field
  const user = AuthService.loggedIn() ? AuthService.getProfile() : null;
  const userId = user ? user._id : null;


  const isUpgraded = user?.isUpgraded || false;

  const handleUpgrade = async () => {
    if (!userId) {
      console.error('User ID is not available');

      return;
    }

    setIsLoading(true);
    const stripe = await stripePromise;

    try {

      // Call the mutation to create a checkout session
      const { data } = await stripePayment({ variables: { userId } });
      const sessionId = data?.createCheckoutSession?.id;

      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error('Stripe Checkout error:', error);
        }
      } else {

        console.error('No session ID received from Stripe');

      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setIsLoading(false);
    }

  };

  const handleConfirmUpgrade = async (sessionId) => {
    try {
      const { data } = await confirmUpgrade({ variables: { sessionId } });

      // Store the new token in local storage
      if (data?.confirmUpgrade?.token) {
        AuthService.login(data.confirmUpgrade.token);
      } else {
        console.error('No token received from upgrade confirmation');
      }
    } catch (error) {
      console.error('Error confirming upgrade:', error);
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
