const User = require('../models/User');
const Itinerary = require('../models/Itinerary');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // Fetch all users
    users: async () => {
      return await User.find();
    },
    // Fetch a single user by id
    user: async (parent, { id }) => {
      return await User.findById(id);
    },
    // Fetch all itineraries
    itineraries: async () => {
      return await Itinerary.find();
    },
    // Fetch a single itinerary by id
    itinerary: async (parent, { id }) => {
      return await Itinerary.findById(id);
    },
  },

  Mutation: {
    // Register a profile
    addProfile: async (parent, { username, email, password }) => {
      // create profile
      const profile = await User.create({ username, email, password });
      // Make a token
      const token = signToken(profile);

      // Send token back to the front end
      return { token, profile };
    },

    aiResponse: async (parent, { itLocation }) => {
      console.log(itLocation);
      return { itLocation };
    },

    // The purpose of login is to verify that the user is logged in correctly
    login: async (parent, { email, password }) => {
      // Try to find the email in the profile list
      const profile = await User.findOne({ email });

      // if there is no profile throw custom made error
      if (!profile) {
        throw AuthenticationError;
      }

      // If we find profile then we will compare the password to make sure it is correct
      const correctPw = await profile.isCorrectPassword(password);

      // if password is not correct throw custom made error
      if (!correctPw) {
        throw AuthenticationError;
      }

      // passing email, name, and id from profile
      // creating the token
      const token = signToken(profile);

      // return the token and the profile that was found
      // We are allowing the user to have a token
      return { token, profile };
    },

    // Add a new user
    // addUser: async (parent, { name, email, password }) => {
    //   const user = await User.create({ name, email, password });
    //   return user;
    // },
    // Add a new itinerary
    addItinerary: async (parent, { description, date, location }) => {
      const itinerary = await Itinerary.create({ description, date, location });
      return itinerary;
    },
  },
};

module.exports = resolvers;
