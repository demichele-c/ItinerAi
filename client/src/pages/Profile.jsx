import { useState } from 'react';
import { Typography, Button, Box, Alert, Container } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { STRIPE_PAYMENT, UPGRADE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// Load Stripe with Vite environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stripePayment] = useMutation(STRIPE_PAYMENT);
  if (!Auth.loggedIn()) {
    return <Typography variant="h4">Please log in to view this page</Typography>;
  }
  // Use a real user ID from your MongoDB database
  // const user = { username: 'chuck_d', id: '6711a82fcb8f228d83135a39' }; // Replace with a valid ObjectId

  const user = Auth.getProfile();
  const id = user?.data._id;
  const isUpgraded = user?.isUpgraded;

  console.log('User Object:', user);
  console.log('IsUpgraded:', isUpgraded);

  const handleUpgrade = async () => {
    setIsLoading(true);
    const stripe = await stripePromise;
    console.log(`Id: ${id}`);
    try {
      // Call the mutation to create a checkout session
      const { data } = await stripePayment({ variables: { userId: id } });
      const sessionId = data.createCheckoutSession.id;

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Stripe Checkout error:', error);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      console.log(`StripeRes: , ${data}`);
      setIsLoading(false);
    }
    // If Payment is successful, call the upgradeUser mutation
    //const [upgradeUser] = useMutation(UPGRADE_USER);
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
            <Typography variant="body2">Upgrade your account to unlock premium features and save your itineraries!</Typography>
          </Alert>
          <Button variant="contained" color="primary" fullWidth onClick={handleUpgrade} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Upgrade'}
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Alert severity="success">
            <Typography variant="body2">Thank you for upgrading! You now have access to premium features.</Typography>
          </Alert>
        </Box>
      )}
    </Container>
  );
};

export default Profile;
