const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const api = require('./routes/index.js');
const { expressMiddleware } = require('@apollo/server');
const { authMiddleware } = require('./utils/auth.js')

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs, 
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();

// Load environment variables from .env file
// dotenv.config();

// // Import typeDefs and resolvers
// const typeDefs = require('./schemas/typeDefs');
// const resolvers = require('./schemas/resolvers');

// Initialize Express app

// Express middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use('/api', api);

// // Apollo Server setup
// async function startServer() {
//   try {
//     const server = new ApolloServer({
//       typeDefs,
//       resolvers,
//       context: ({ req }) => {
//         // Authentication logic can go here
//       },
//     });

//     await server.start();
//     server.applyMiddleware({ app });

//     // MongoDB connection
//     mongoose
//       .connect('mongodb://localhost:27017/itinerai')
//       .then(() => console.log('Connected to MongoDB'))
//       .catch((err) => {
//         console.error('Error connecting to MongoDB:', err.message);
//         mongoose.connection.close();
//       });

//     // Start the Express server
//     app.listen(PORT, () => {
//       console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
//     });
//   } catch (error) {
//     console.error('Error starting server:', error);
//   }
// }

// // Start Apollo and Express server
// startServer();
