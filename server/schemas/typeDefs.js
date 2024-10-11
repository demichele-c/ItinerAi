const { gql } = require('apollo-server-express');

// Define your GraphQL schema using gql
const typeDefs = gql`
  # Define the User type
  type User {
    id: ID!
    name: String!
    email: String!
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

  # Define the Query type
  type Query {
    users: [User]
    user(id: ID!): User
    itineraries: [Itinerary]
    itinerary(id: ID!): Itinerary
  }

  # Define the Mutation type
  type Mutation {
    addUser(name: String!, email: String!): User
    addItinerary(description: String!, date: String!, location: String!): Itinerary
  }
`;

module.exports = typeDefs;
