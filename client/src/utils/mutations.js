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

export const UPGRADE_USER = gql`
  mutation createCheckoutSession($userId: ID!) {
    createCheckoutSession(userId: $userId) {
      id
    }
  }
`;

export const FETCH_ITINERARIES = gql`
  mutation AiResponse($itLocation: String, $itDate: String, $itCelebration: String, $itInterests: String, $itFoodPreferences: String, $itTimeRange: String) {
    aiResponse(itLocation: $itLocation, itDate: $itDate, itCelebration: $itCelebration, itInterests: $itInterests, itFoodPreferences: $itFoodPreferences, itTimeRange: $itTimeRange) {
      content
    }
  }
`;
