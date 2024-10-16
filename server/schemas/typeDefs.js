// const { gql } = require('apollo-server-express');

// // Define your GraphQL schema using gql
// const typeDefs = gql`
//   # Define the User type
//   type User {
//     username: String
//     password: String
//     id: ID
//     name: String
//     email: String
//   }

//   type Auth {
//     token: ID!
//     user: User
//   }

//   # Define the Itinerary type
//   type Itinerary {
//     id: ID!
//     description: String!
//     date: String!
//     location: String!
//   }

//   type aiResponse {
//     content: String
//   }

//   # Define the Query type
//   type Query {
//     users: [User]
//     user(id: ID!): User
//     itineraries: [Itinerary]
//     itinerary(id: ID!): Itinerary
//   }

//   # Define the Mutation type
//   type Mutation {
//     addItinerary(description: String!, date: String!, location: String!): Itinerary
//     addProfile(username: String!, email: String!, password: String!, name: String!): Auth
//     login(email: String!, password: String!): Auth
//     aiResponse(itLocation: String, itDate: String, itCelebration: String, itInterests: String, itFoodPreferences: String): aiResponse
//   }
// `;

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
    isUpgraded: Boolean!  # Track if the user is upgraded
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
    login(email: String!, password: String!): Auth
    createCheckoutSession(userId: ID!): CheckoutSession  # New mutation for Stripe checkout
  }

  type CheckoutSession {
    id: String!
  }
`;

module.exports = typeDefs;
