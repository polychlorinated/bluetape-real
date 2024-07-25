'use strict';

var httpStatus = require('http-status');

var _require = require('../services'),
  notificationService = _require.notificationService;

var ApiError = require('../utils/ApiError');

var getUserFromBearerToken = require('../utils/getBearerToken');

var readNotifications = function readNotifications(req, res) {
  var a;
  return regeneratorRuntime.async(
    function readNotifications$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(notificationService.readNotifications(req.params.notificationId));

          case 3:
            a = _context.sent;
            global.socketio.emit('fetch_notifications');
            res.send(httpStatus.OK);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    },
    null,
    null,
    [[0, 9]]
  );
};

var readAllNotifications = function readAllNotifications(req, res) {
  return regeneratorRuntime.async(
    function readAllNotifications$(_context2) {
      while (1) {
        switch ((_context2.prev = _context2.next)) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(notificationService.readAllNotifications(req.params.userId));

          case 3:
            // global.socketio.emit('fetch_notifications');
            res.send(httpStatus.OK);
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](0);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    },
    null,
    null,
    [[0, 6]]
  );
};

var getNotifications = function getNotifications(req, res) {
  var notifications;
  return regeneratorRuntime.async(
    function getNotifications$(_context3) {
      while (1) {
        switch ((_context3.prev = _context3.next)) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(notificationService.getNotifications(getUserFromBearerToken(req)));

          case 3:
            notifications = _context3.sent;
            res.status(httpStatus.OK).send(notifications);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](0);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, _context3.t0.message);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    },
    null,
    null,
    [[0, 8]]
  );
};

module.exports = {
  readNotifications: readNotifications,
  getNotifications: getNotifications,
  readAllNotifications: readAllNotifications,
};
