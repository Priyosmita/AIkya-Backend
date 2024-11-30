const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// MongoDB connection string from the environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Rijuraj:Riju4929!@aikya.htvianz.mongodb.net/';

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Export the connection function
module.exports = connectDB;
