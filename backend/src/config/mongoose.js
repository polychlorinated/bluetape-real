const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Handle when the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

module.exports = connectDB;