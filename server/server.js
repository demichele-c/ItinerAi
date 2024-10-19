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

// Use raw body for Stripe webhooks
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;

    // Update the user's isUpgraded status
    try {
      await User.findByIdAndUpdate(userId, { isUpgraded: true }, { new: true });
      console.log(`User ${userId} upgraded successfully.`);
    } catch (error) {
      console.error(`Failed to upgrade user ${userId}:`, error);
    }
  }

  res.json({ received: true });
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  // Add middleware to parse URL-encoded data and JSON
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Add the Stripe webhook route
  app.use(
    '/webhook',
    bodyParser.raw({ type: 'application/json' }), // Raw body parser for Stripe webhooks
    webhookRoutes
  );

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
