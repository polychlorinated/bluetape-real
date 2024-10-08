const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const httpStatus = require('http-status');
const config = require('./config/config');
const logger = require('./config/logger');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const rateLimiter = require('./middlewares/rateLimiter');
const ApiError = require('./utils/ApiError');
const connectDB = require('./config/mongoose');

const app = express();

// Set Mongoose options
mongoose.set('strictQuery', false); // or true, depending on your preference

// Connect to MongoDB
connectDB().then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});

// Set security HTTP headers
app.use(helmet());

// Parse JSON request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Gzip compression
app.use(compression());

// Enable CORS
app.use(cors({
  origin: config.clientUrl,
  credentials: true,
}));

// Limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/auth', rateLimiter);
}

// v1 api routes
app.use('/v1', routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle error
app.use(errorHandler);

// Additional error logging
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  next(err);
});

module.exports = app;