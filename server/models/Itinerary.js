const { Schema, model } = require('mongoose');
const activitySchema = new Schema({
  name: String,
  time_frame: String,
  description: String,
  address: String,
  link: String,
  website: String,
});
const diningOptionSchema = new Schema({
  name: String,
  description: String,
  rating: String,
  address: String,
  phone: String,
  link: String,
  website: String,
});
const itinerarySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  city: String,
  date: String,
  icon: String,
  time_frame: String,
  celebration: String,
  activities: [activitySchema],
  dining_options: [diningOptionSchema],
});
const Itinerary = model('Itinerary', itinerarySchema);
module.exports = Itinerary;
