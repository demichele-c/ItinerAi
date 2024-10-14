const { Schema, model } = require('mongoose');

const itinerarySchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  locations: {
    type: [String],
    required: true,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
});

module.exports = model('Itinerary', itinerarySchema);
