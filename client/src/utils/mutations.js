import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!, $name: String!) {
    addProfile(username: $username, email: $email, password: $password, name: $name) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const STRIPE_PAYMENT = gql`
  mutation createCheckoutSession($userId: ID!) {
    createCheckoutSession(userId: $userId) {
      id
    }
  }
`;

export const UPGRADE_USER = gql`
  mutation upgradeUser($userId: ID!, $isUpgraded: Boolean) {
    upgradeUser(userId: $userId, isUpgraded: $isUpgraded) {
      id
    }
  }
`;

export const FETCH_ITINERARIES = gql`
  mutation aiResponse(
    $itLocation: String
    $itDate: String
    $itCelebration: String
    $itInterests: String
    $itFoodPreferences: String
    $itSecondFoodPreference: String
    $itTimeRange: String
  ) {
    aiResponse(
      itLocation: $itLocation
      itDate: $itDate
      itCelebration: $itCelebration
      itInterests: $itInterests
      itFoodPreferences: $itFoodPreferences
      itSecondFoodPreference: $itSecondFoodPreference
      itTimeRange: $itTimeRange
    ) {
      content
    }
  }
`;

export const DEL_SINGLE_ITINERARY = gql`
  mutation DeleteItinerary($deleteItineraryId: ID!) {
    deleteItinerary(id: $deleteItineraryId) {
      username
      email
    }
  }
`;

export const DEL_SINGLE_ACTIVITY = gql`
  mutation DeleteActivity($itineraryId: ID!, $activityName: String!) {
    deleteActivity(itineraryId: $itineraryId, activityName: $activityName) {
      activities {
        name
        description
      }
    }
  }
`;
