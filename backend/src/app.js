const config = require('./config/config');
const routes = require('./routes/v1');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const rateLimiter = require('./middlewares/rateLimiter');
const logger = require('./config/logger');
const express = require('express');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

// Error handling middlewares
app.use(errorConverter);
app.use(errorHandler);

// Security middlewares
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

app.use(helmet());
app.use(cors());
app.use(compression());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', rateLimiter);
}

// v1 api routes
app.use('/v1', routes);

// Example route with logging

module.exports = app; // Ensure the app module is exported