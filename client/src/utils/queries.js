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

export const SAVED_ITINERARIES = gql`
  query MyItineraries {
    myItineraries {
      celebration
      city
      date
      id
      icon
      time_frame
      activities {
        time_frame
        address
        description
        name
        link
        website
      }
      dining_options {
        name
        description
        address
        phone
        link
        website
        rating
      }
    }
  }
`;
