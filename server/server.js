const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Import typeDefs and resolvers
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');




// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Apollo Server setup
async function startServer() {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        // Authentication logic can go here
      },
    });

    await server.start();
    server.applyMiddleware({ app });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/itinerai')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    mongoose.connection.close();
  });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

// Start Apollo and Express server
startServer();
