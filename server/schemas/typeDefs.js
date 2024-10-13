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
  # Missing addProfile and Login Mutations Was Causing Error, Please verify that the mutations are correct
  type Mutation {
    addUser(name: String!, email: String!): User
    addItinerary(description: String!, date: String!, location: String!): Itinerary


    # Was getting an error starting the server, so I added the following mutation. I do not know if it is correct.
=======

    addProfile(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
