// const OpenAIApi = require('openai');

// require('dotenv').config();

// const User = require('../models/User');
// const Itinerary = require('../models/Itinerary');
// const { signToken, AuthenticationError } = require('../utils/auth');

// const resolvers = {
//   Query: {
//     // Fetch all users
//     users: async () => {
//       return await User.find();
//     },
//     // Fetch a single user by id
//     user: async (parent, { id }) => {
//       return await User.findById(id);
//     },
//     // Fetch all itineraries
//     itineraries: async () => {
//       return await Itinerary.find();
//     },
//     // Fetch a single itinerary by id
//     itinerary: async (parent, { id }) => {
//       return await Itinerary.findById(id);
//     },
//   },

//   Mutation: {
//     // Register a profile
//     addProfile: async (parent, { username, email, password, name }) => {
//       // create profile
//       const profile = await User.create({ username, email, password, name });
//       // Make a token
//       const token = signToken(profile);

//       // Send token back to the front end
//       return { token, user: profile };
//     },

//     aiResponse: async (parent, { itLocation, itDate, itCelebration, itInterests, itFoodPreference }) => {
//       // console.log(itLocation);
//       const openai = new OpenAIApi({
//         api_key: process.env.OPENAIKEY,
//       });

//       const response = await openai.chat.completions.create({
//         model: 'gpt-4o-mini',
//         temperature: 0.2,
//         max_tokens: 500,
//         messages: [
//           {
//             role: 'system',
//             content: `
//           		I need to return this information in JSON formatted but exclude the json\n, one key object value will be the city name with certainly here is the list, another key object value will save an array of each recommendation provided, each recommendation should include a key value for the restaurant description, address, phone number and name. If key values are not found please provide "N/A".  I am in ${itLocation} and I'm looking for a place to have ${itFoodPreference} food. 
//     I'm interested in a ${itCelebration} dining experience. Could you give me up to three recommendations?`,
//           },
//           // {
//           //   role: 'system',
//           //   content: systemContent,
//           // },
//           // {
//           // 	role: 'user',
//           // 	content: systemContent,
//           // },
//           // ...messages,
//         ],
//       });

//       // const APIResponse = new Response(JSON.stringify({ response: response.data.choices[0] }));
//       console.log(response.choices[0].message);

//       return response.choices[0].message;
//     },

//     // The purpose of login is to verify that the user is logged in correctly
//     login: async (parent, { email, password }) => {
//       // Try to find the email in the profile list
//       const profile = await User.findOne({ email });

//       // if there is no profile throw custom made error
//       if (!profile) {
//         throw AuthenticationError;
//       }

//       // If we find profile then we will compare the password to make sure it is correct
//       const correctPw = await profile.isCorrectPassword(password);

//       // if password is not correct throw custom made error
//       if (!correctPw) {
//         throw AuthenticationError;
//       }

//       // passing email, name, and id from profile
//       // creating the token
//       const token = signToken(profile);

//       // return the token and the profile that was found
//       // We are allowing the user to have a token
//       return { token, user: profile };
//     },

//     // Add a new user
//     // addUser: async (parent, { name, email, password }) => {
//     //   const user = await User.create({ name, email, password });
//     //   return user;
//     // },
//     // Add a new itinerary
//     addItinerary: async (parent, { description, date, location }) => {
//       const itinerary = await Itinerary.create({ description, date, location });
//       return itinerary;
//     },
//   },
// };

// module.exports = resolvers;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const Itinerary = require('../models/Itinerary');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { id }) => {
      return await User.findById(id);
    },
    itineraries: async () => {
      return await Itinerary.find();
    },
    itinerary: async (parent, { id }) => {
      return await Itinerary.findById(id);
    },
  },

  Mutation: {
    addProfile: async (parent, { username, email, password, name }) => {
      const profile = await User.create({ username, email, password, name });
      const token = signToken(profile);
      return { token, user: profile };
    },

    createCheckoutSession: async (parent, { userId }) => {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'price_1QAZ6ZE1Br6z80SV5wPauWoa', // Replace with your price ID
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/me`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        metadata: { userId },
      });

      // Update user to upgraded
      await User.findByIdAndUpdate(userId, { isUpgraded: true }, { new: true });

      return { id: session.id };
    },

    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile found with this email address.');
      }

      const correctPw = await profile.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password.');
      }

      const token = signToken(profile);
      return { token, user: profile };
    },

    addItinerary: async (parent, { description, date, location }) => {
      const itinerary = await Itinerary.create({ description, date, location });
      return itinerary;
    },
  },
};

module.exports = resolvers;
