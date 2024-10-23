const { Schema, model } = require('mongoose');
const activitySchema = new Schema({
  name: String,
  description: String,
  address: String,
  link: String,
});
const diningOptionSchema = new Schema({
  name: String,
  description: String,
  address: String,
  phone: String,
  link: String,
});
const itinerarySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  city: String,
  date: String,
  time_frame: String,
  celebration: String,
  activities: [activitySchema],
  dining_options: [diningOptionSchema],
});
const Itinerary = model('Itinerary', itinerarySchema);
module.exports = Itinerary;

// const { Schema, model } = require('mongoose');

// const itinerarySchema = new Schema({
//   activities: [
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       description: {
//         type: String,
//         required: true,
//       },
//       address: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   celebration: {
//     type: String,
//     default: "N/A",
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   dining_options: [
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       description: {
//         type: String,
//         required: true,
//       },
//       address: {
//         type: String,
//         required: true,
//       },
//       phone: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   time_frame: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
// });

// const Itinerary = model('Itinerary', itinerarySchema);
// module.exports = Itinerary;
