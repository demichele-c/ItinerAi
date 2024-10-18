const OpenAIApi = require('openai');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

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
    addProfile: async (parent, { username, email, password, name }) => {
      // create profile
      const profile = await User.create({ username, email, password, name });
      // Make a token
      const token = signToken(profile);

      // Send token back to the front end
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
        cancel_url: `${process.env.CLIENT_URL}/me`,
        metadata: { userId },
      });

      // Update user to upgraded
      console.log(`UserId: , ${userId}`);
      const user = await User.findByIdAndUpdate(userId, { isUpgraded: true }, { new: true });
      console.log(`User: , ${user}`);
      //await User.findByIdAndUpdate(userId, { isUpgraded: true }, { new: true });

      return { id: session.id };
    },
    // upgradeUser: async (parent, { userId, isUpgraded }) => {
    //   return await User.findByIdAndUpdate({ isUpgraded }, { new: true });
    // },

    aiResponse: async (parent, { itLocation, itDate, itCelebration, itInterests, itFoodPreference, itTimeRange }) => {
      // console.log(itLocation);
      const openai = new OpenAIApi({
        api_key: process.env.OPENAIKEY,
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 500,
        messages: [
          {
            role: 'system',
            content: `
            
            Please return a detailed itinerary in JSON format but exclude the json\n.
            The JSON should include the following keys:
            - "city": The name of the city.
            - "date": The planned date for the itinerary.
            - "time_frame": The specified time frame for the activities and dining.
            - "interests": An array of the user's interests related to the experience.
            - "activities": An array of suggested activities to do within the specified time frame based on my interests and celebration based on current events going on in area.
            - "dining_options": An array of dining recommendations, where each recommendation includes:
                - "name": The name of the restaurant.
                - "description": A brief description of the restaurant.
                - "address": The address of the restaurant.
                - "phone": The phone number of the restaurant.
            If any key values are not found, please provide "N/A".
            I am in ${itLocation} and I'm looking for a place to have ${itFoodPreference} food.
            I'm interested in a ${itCelebration} dining experience on ${itDate} ${itTimeRange}.
            Additionally, my interests include ${itInterests}.
            Please provide a detailed itinerary including three dining options and a list of activities based on my  ${itInterests} and ${itCelebration}.`,
          },
        ],
      });

      console.log(response.choices[0].message);

      return response.choices[0].message;
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
      return { token, user: profile };
    },

    // Add a new itinerary
    addItinerary: async (parent, { description, date, location }) => {
      const itinerary = await Itinerary.create({ description, date, location });
      return itinerary;
    },
  },
};

module.exports = resolvers;
