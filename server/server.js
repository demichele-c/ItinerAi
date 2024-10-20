// server.js
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser'); // Needed for the raw body parser
const webhookRoutes = require('./routes/webhook'); // Import the webhook route

require('dotenv').config();
const User = require('./models/User'); // Adjust the path as needed
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  // **1. Mount the Webhook Route BEFORE Body Parsing Middleware**
  app.use(
    '/webhook',
    bodyParser.raw({ type: 'application/json' }), // Raw body parser for Stripe webhooks
    webhookRoutes
  );

  // **2. Apply Body Parsing Middleware to All Other Routes**
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Apollo GraphQL middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Error handling middleware (optional but recommended)
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // Start the database and server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
