import { gql } from '@apollo/client';

export const QUERY_ITINERARIES = gql`
  query AiResponse($itLocation: String) {
    aiResponse(itLocation: $itLocation) {
      itLocation
    }
  }
`;
export const QUERY_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      email
      isUpgraded
      name
      username
    }
  }
`;
