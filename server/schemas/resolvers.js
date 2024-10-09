const User = require('../models/User');
const Itinerary = require('../models/Itinerary');

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
    // Add a new user
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      return user;
    },
    // Add a new itinerary
    addItinerary: async (parent, { description, date, location }) => {
      const itinerary = await Itinerary.create({ description, date, location });
      return itinerary;
    },
  },
};

module.exports = resolvers;
