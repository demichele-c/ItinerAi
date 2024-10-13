//const axios = require('axios');
const express = require('express');


// @apollo/server not needed as it is included in apollo-server-express
const { ApolloServer } = require('apollo-server-express');

const dotenv = require('dotenv');
const path = require('path');

const { authMiddleware } = require('./utils/auth.js');
=======
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
=======
const server = new ApolloServer({
  typeDefs,
  resolvers,
});


// Establish Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// Apollo Server setup
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // applyMiddleware method connects apollo server to express
  // allows us to use RESTful API alongside GraphQL API
  // default path is /graphql
  server.applyMiddleware({ app });

  // Use GraphQL For RESTFUL API
  app.get('/openAi', async (req, res) => {
    res.json({ message: 'This Will Connect To The openAi API!' });
    // const response = await axios.post(
    //   'https://api.openai.com/v1/engines/text-davinci-003/completions',
    //   {
    //     prompt: 'Itinerary_Prompt_Goes_Here',
    //     max_tokens: 333,
    //     temperature: 0.5,
    //     n: 1,
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer YOUR_API_KEY`,
    //     },
    //   }
    // );
    // res.json(response.data);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
=======
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  // if we're in production, serve client/dist as static assets
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


// Start Apollo Server
startApolloServer(typeDefs, resolvers);
=======
startApolloServer();

// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const path = require('path');

// // Load environment variables from .env file
// dotenv.config();

// // Import typeDefs and resolvers
// const typeDefs = require('./schemas/typeDefs');
// const resolvers = require('./schemas/resolvers');

// // Initialize Express app
// const app = express();
// const PORT = process.env.PORT || 3001;

// // Express middleware For 3rd party API routes
// const api = require('./routes/index.js');
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
//       .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/itinerai', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(() => console.log('Connected to MongoDB'))
//       .catch((err) => {
//         console.error('Error connecting to MongoDB:', err.message);
//         mongoose.connection.close();
//       });

//     // Serve the static files from the Vite frontend dist directory
//     if (process.env.NODE_ENV === 'production') {
//       app.use(express.static(path.join(__dirname, '../client/dist')));

//       app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
//       });
//     }

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

