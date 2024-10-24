const { gql } = require('apollo-server-express');
const typeDefs = gql`
  # Define the User type
  type User {
    id: ID!
    username: String
    name: String
    email: String
    isUpgraded: Boolean
    itineraries: [Itinerary]
  }

  # Define the Auth type
  type Auth {
    token: ID!
    user: User
  }
  # Define the Activity type
  type Activity {
    time_frame: String
    name: String
    description: String
    address: String
    link: String
    website: String
  }
  # Define the DiningOption type
  type DiningOption {
    name: String
    description: String
    rating: String
    address: String
    phone: String
    link: String
    website: String
  }
  # Define the Itinerary type
  type Itinerary {
    id: ID!
    activities: [Activity]!
    celebration: String
    city: String
    icon: String
    date: String
    dining_options: [DiningOption]!
    time_frame: String
    user: User!
  }
  # Define the AIResponse type
  type AIResponse {
    content: String
    itinerary: Itinerary
  }
  # Define the CheckoutSession type
  type CheckoutSession {
    id: String!
  }
  # Define the Query type
  type Query {
    users: [User]
    user(id: ID!): User
    itineraries: [Itinerary]
    itinerary(id: ID!): Itinerary
    myItineraries: [Itinerary]
  }
  # Define the Mutation type
  type Mutation {
    deleteActivity(itineraryId: ID!, activityName: String!): Itinerary
    addProfile(username: String!, email: String!, password: String!, name: String!): Auth
    login(email: String!, password: String!): Auth
    createCheckoutSession(userId: ID!): CheckoutSession
    confirmUpgrade(sessionId: String!): Auth
    aiResponse(
      itLocation: String
      itDate: String
      itCelebration: String
      itInterests: String
      itFoodPreferences: String
      itSecondFoodPreference: String
      itTimeRange: String
    ): AIResponse
    deleteItinerary(id: ID!): User
  }
`;

module.exports = typeDefs;
