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

const app = express();

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
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', rateLimiter);
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

module.exports = app;