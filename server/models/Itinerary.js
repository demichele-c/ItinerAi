const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  locations: {
    type: [String],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;
