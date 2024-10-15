const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { type } = require('os');

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enables introspection (required for GraphQL Playground)
  playground: true, // Enables GraphQL Playground in development mode
});

// MongoDB client setup using MongoClient
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB with MongoClient!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if MongoDB fails to connect
  }
}

const startApolloServer = async (typeDefs, resolvers) => {
  try {
    await server.start();
    console.log('Apollo Server started successfully.');

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: authMiddleware,
      })
    );
    console.log('GraphQL middleware applied to /graphql');

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
      console.log('Serving static files in production.');
    }

    // First connect to MongoDB before starting the server
    await connectToDatabase();

    // Start the server and bind it to all interfaces (0.0.0.0)
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`API server running on http://localhost:${PORT}`);
      console.log(`GraphQL Playground available at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Error starting Apollo server or Express:', error);
  }
};

// Start the Apollo and Express server
startApolloServer(typeDefs, resolvers);
