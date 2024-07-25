"use strict";

var mongoose = require('mongoose');

var _require = require('socket.io'),
    Server = _require.Server;

var _require2 = require('http'),
    createServer = _require2.createServer;

var app = require('./app');

var config = require('./config/config');

var logger = require('./config/logger');

mongoose.connect(config.mongoose.url, config.mongoose.options).then(function () {
  logger.info('Connected to MongoDB');
});
var server = createServer(app);
server.listen(config.port, function () {
  logger.info("Listening to port ".concat(config.port));
}); // const allowedOrigins = (config.corsOrigins || '').split(' ');

var io = new Server(server, {
  cors: {
    origin: '*'
  } // cors: {
  //   origin(origin, callback) {
  //     if (allowedOrigins.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   methods: ['GET', 'POST'],
  // },

});
io.on('connection', function (socket) {
  logger.info('Client Connected!');
  global.socketio = io; // disconnect is fired when a client leaves the server

  socket.on('disconnect', function () {
    logger.info('Client Disconnected!');
  });
});

var exitHandler = function exitHandler() {
  if (server) {
    server.close(function () {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

var unexpectedErrorHandler = function unexpectedErrorHandler(error) {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', function () {
  logger.info('SIGTERM received');

  if (server) {
    server.close();
  }
});