import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const FETCH_ITINERARIES = gql`
  mutation AiResponse($itLocation: String, $itCelebration: String, $itFoodPreferences: String) {
    aiResponse(itLocation: $itLocation, itCelebration: $itCelebration, itFoodPreferences: $itFoodPreferences) {
      content
    }
  }
`;
