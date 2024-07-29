"use strict";

var express = require('express');

var helmet = require('helmet');

var xss = require('xss-clean'); // const request = require('request');


var path = require('path');

var cors = require('cors');

var cookieParser = require('cookie-parser');

var rateLimit = require('express-rate-limit');

var bodyParser = require('body-parser');

var mongoSanitize = require('express-mongo-sanitize');

var compression = require('compression');

var passport = require('passport');

var httpStatus = require('http-status');

var config = require('./config/config');

var morgan = require('./config/morgan');

var _require = require('./config/passport'),
    jwtStrategy = _require.jwtStrategy;

var _require2 = require('./middlewares/rateLimiter'),
    authLimiter = _require2.authLimiter;

var routes = require('./routes/v1');

var _require3 = require('./middlewares/error'),
    errorConverter = _require3.errorConverter,
    errorHandler = _require3.errorHandler;

var ApiError = require('./utils/ApiError');

var app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
} // set security HTTP headers


app.use(helmet()); // parse json request body

app.use(express.json()); /// set limit

var limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); // Body parser, reading data from body into req.body

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 1000000
}));
app.use(cookieParser()); // parse urlencoded request body

app.use(express.urlencoded({
  extended: true
})); // sanitize request data

app.use(xss());
app.use(mongoSanitize()); // gzip compression

app.use(compression()); // enable cors

app.use(cors());
app.options('*', cors()); // const allowedOrigins = (config.corsOrigins || '').split(' ');
// app.use(function (req, res, next) {
//   const { origin } = req.headers;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });
// jwt authentication

app.use(passport.initialize());
passport.use('jwt', jwtStrategy); // limit repeated failed requests to auth endpoints

if (config.env === 'production') {
  app.use('/auth', authLimiter);
} // v1 api routes


app.use('/v1', routes);
app.use(express["static"](path.join(__dirname, '../uploads'))); // if (process.env.NODE_ENV === 'production') {
//   // Express will serve up production assets
//   // like our main.js file, or main.css file!
//   app.use(express.static('../../client/build'));
//   // Express will serve up the index.html file
//   // if it doesn't recognize the route
//   // eslint-disable-next-line global-require
//   app.use(express.static(path.join(__dirname, 'uploads')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
// send back a 404 error for any unknown api request

app.use(function (req, res, next) {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
}); // convert error to ApiError, if needed

app.use(errorConverter); // handle error

app.use(errorHandler);
module.exports = app; // MONGODB_URL='mongodb+srv://UmerNisar:A5sEL9Ped84kaBsO@cluster0.3nial.mongodb.net/management'