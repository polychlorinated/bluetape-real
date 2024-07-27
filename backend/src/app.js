const express = require('express');
const config = require('./config/config');
const routes = require('./routes/v1');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimiter');
const logger = require('./config/logger');
const errorConverter = require('./middlewares/error');

const app = express();

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
app.get('/api/example', (req, res) => {
  res.send('Example route');
});

// Error handling middlewares
app.use(errorConverter);
app.use(errorHandler);

module.exports = app; // Export the app module