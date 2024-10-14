const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

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

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

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

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();

// //const axios = require('axios');
// const express = require('express');

// // @apollo/server not needed as it is included in apollo-server-express
// const { ApolloServer } = require('apollo-server-express');

// const dotenv = require('dotenv');
// const path = require('path');

// const { authMiddleware } = require('./utils/auth.js');

// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');

// const PORT = process.env.PORT || 3001;
// const app = express();
// const server = new ApolloServer({ typeDefs, resolvers });

// // Establish Express Middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/dist')));
// }

// // Apollo Server setup
// const startApolloServer = async (typeDefs, resolvers) => {
//   await server.start();

//   // applyMiddleware method connects apollo server to express
//   // allows us to use RESTful API alongside GraphQL API
//   // default path is /graphql
//   server.applyMiddleware({ app });

//   // Use GraphQL For RESTFUL API
//   app.get('/openAi', async (req, res) => {
//     console.log(`itLocation Param - `, req.query.itLocation);
//     res.json({ itLocation: req.query.itLocation });
//   });
//   if (process.env.NODE_ENV === 'production') {
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
//     });
//   }
//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//     });
//   });
// };

// // Start Apollo Server
// startApolloServer(typeDefs, resolvers);
