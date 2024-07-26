const errorHandler = require('./middlewares/errorHandler');
const authLimiter = require('./middlewares/authLimiter');
const logger = require('./config/logger');
const errorConverter = require('./middlewares/error'); // Updated import

const app = express();

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// Example route with logging
app.get('/api/example', (req, res) => {
  logger.info(`Received request: ${req.method} ${req.url}`);
  res.send('Example route');
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;