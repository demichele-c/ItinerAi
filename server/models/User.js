const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  itineraries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Itinerary',
    },
  ],
});

// Default empty array for itineraries
userSchema.pre('save', function (next) {
  if (!this.itineraries) {
    this.itineraries = [];
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
