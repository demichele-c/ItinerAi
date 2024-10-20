// src/pages/Profile.jsx

import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Alert, Container, CircularProgress } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';

// GraphQL Queries and Mutations
const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      name
      email
      isUpgraded
    }
  }
`;

const STRIPE_PAYMENT = gql`
  mutation createCheckoutSession($userId: ID!) {
    createCheckoutSession(userId: $userId) {
      id
    }
  }
`;

const CONFIRM_UPGRADE = gql`
  mutation confirmUpgrade($sessionId: String!) {
    confirmUpgrade(sessionId: $sessionId) {
      token
      user {
        id
        username
        isUpgraded
      }
    }
  }
`;

// Load Stripe with environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [upgradeError, setUpgradeError] = useState(null);

  const [stripePayment] = useMutation(STRIPE_PAYMENT);
  const [confirmUpgrade] = useMutation(CONFIRM_UPGRADE);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch the logged-in user from AuthService and use the _id field
  const currentUserProfile = AuthService.loggedIn() ? AuthService.getProfile() : null;
  const userId = currentUserProfile ? currentUserProfile._id : null;

  // GraphQL query to fetch user data
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,
    fetchPolicy: 'network-only', // Always fetch from server to get the latest data
  });

  const user = data?.user;

  // Parse query parameters to get sessionId
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('sessionId');

    if (sessionId && user && !user.isUpgraded) {
      handleConfirmUpgrade(sessionId);
      // Clean up the URL by removing sessionId
      navigate('/me', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, user]);

  const handleUpgrade = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    setIsLoading(true);
    setUpgradeError(null);
    const stripe = await stripePromise;

    try {
      // Call the mutation to create a checkout session
      const { data } = await stripePayment({ variables: { userId } });
      const sessionId = data?.createCheckoutSession?.id;

      if (sessionId) {
        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Stripe Checkout error:', error);
          setUpgradeError(error.message);
        }
      } else {
        console.error('No session ID received from Stripe');
        setUpgradeError('Failed to create checkout session.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setUpgradeError('An unexpected error occurred during checkout.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmUpgrade = async (sessionId) => {
    setIsLoading(true);
    setUpgradeError(null);

    try {
      const { data } = await confirmUpgrade({ variables: { sessionId } });

      // Store the new token in local storage
      if (data?.confirmUpgrade?.token) {
        AuthService.login(data.confirmUpgrade.token);
        // Refetch user data to get updated isUpgraded status
        await refetch();
      } else {
        console.error('No token received from upgrade confirmation');
        setUpgradeError('Failed to confirm upgrade.');
      }
    } catch (error) {
      console.error('Error confirming upgrade:', error);
      setUpgradeError('An error occurred while confirming your upgrade.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">
            <Typography variant="body2">
              An error occurred while fetching your profile. Please try again later.
            </Typography>
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {user?.username ? `${user.username}'s Profile` : 'Your Profile'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Name:</strong> {user?.name || 'Name not available'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {user?.email || 'Email not available'}
        </Typography>
      </Box>

      {!user?.isUpgraded ? (
        <Box sx={{ mt: 4 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Upgrade your account to unlock premium features and save your itineraries!
            </Typography>
          </Alert>
          {upgradeError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="body2">{upgradeError}</Typography>
            </Alert>
          )}
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
