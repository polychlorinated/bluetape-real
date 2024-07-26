const mongoose = require('mongoose');
const { Server } = require('socket.io');
const { createServer } = require('http');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const JWT_SECRET = process.env.JWT_SECRET;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
});

const server = createServer(app);
server.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

// const allowedOrigins = (config.corsOrigins || '').split(' ');

const io = new Server(server, {
  cors: {
    origin: '*',
  },
  // cors: {
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

io.on('connection', (socket) => {
  logger.info('Client Connected!');
  global.socketio = io;

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    logger.info('Client Disconnected!');
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
