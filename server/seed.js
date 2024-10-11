const mongoose = require('mongoose');
const User = require('./models/User');
const Itinerary = require('./models/Itinerary');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/itinerai')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    mongoose.connection.close();
  });

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Itinerary.deleteMany({});

    // Create users
    const user1 = await User.create({
      username: 'testuser1',
      email: 'testuser1@example.com',
      password: 'password123',
    });

    const user2 = await User.create({
      username: 'testuser2',
      email: 'testuser2@example.com',
      password: 'password456',
    });

    // Create itineraries for user1
    const itinerary1 = await Itinerary.create({
      date: '2024-10-01',
      locations: ['Restaurant A', 'Cinema B'],
      user: user1._id,
    });

    const itinerary2 = await Itinerary.create({
      date: '2024-10-05',
      locations: ['Museum X', 'Park Y'],
      user: user2._id,
    });

    // Push itineraries into the user's itineraries array and save
    user1.itineraries.push(itinerary1);
    await user1.save();

    user2.itineraries.push(itinerary2);
    await user2.save();

    console.log('Database seeded successfully!');
    mongoose.connection.close();  // Close the connection after seeding
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();  // Close the connection if an error occurs
  }
};

seedDatabase();
