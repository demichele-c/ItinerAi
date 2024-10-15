const { Schema, model} = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  itineraries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Itinerary',
    },
  ],
});

// set up pre-save middleware to create password
// We want to run the function before the document is saved
userSchema.pre('save', async function (next) {
  // if this is a new user or the password has been changed
  // we want to create an encrypted password
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  // This releases the hook because nothing happens until this call
  next();
});

// This function will get the current password that the user typed in and the eccrypted password in the database
userSchema.methods.isCorrectPassword = async function (password) {
  // .compare will return true or false
  // Create a custom method to compare the passed in password with the hashed password
  return bcrypt.compare(password, this.password);
};

// Default empty array for itineraries
userSchema.pre('save', function (next) {
  if (!this.itineraries) {
    this.itineraries = [];
  }
  next();
});

const User = model('User', userSchema);
module.exports = User;
