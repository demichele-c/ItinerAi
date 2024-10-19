// module.exports = typeDefs;
const { gql } = require('apollo-server-express');

// Define your GraphQL schema using gql
const typeDefs = gql`
  # Define the User type
  type User {
    username: String
    password: String
    id: ID
    name: String
    email: String
    isUpgraded: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  # Define the Itinerary type
  type Itinerary {
    id: ID!
    description: String!
    date: String!
    location: String!
  }

  type CheckoutSession {
  id: String!
}

  type aiResponse {
    content: String
  }

  # Define the Query type
  type Query {
    users: [User]
    user(id: ID!): User
    itineraries: [Itinerary]
    itinerary(id: ID!): Itinerary
  }

  # Define the Mutation type
  type Mutation {
    addItinerary(description: String!, date: String!, location: String!): Itinerary
    addProfile(username: String!, email: String!, password: String!, name: String!): Auth
    upgradeUser(userId: ID!, isUpgraded: Boolean): User
    login(email: String!, password: String!): Auth
    createCheckoutSession(userId: ID!): CheckoutSession
    aiResponse(itLocation: String, itDate: String, itCelebration: String, itInterests: String, itFoodPreferences: String, itTimeRange: String): aiResponse
    confirmUpgrade(sessionId: String!): Auth
  }
`;

module.exports = typeDefs;
