"use strict";

var httpStatus = require('http-status');

var pick = require('../utils/pick');

var ApiError = require('../utils/ApiError');

var catchAsync = require('../utils/catchAsync');

var _require = require('../services'),
    userService = _require.userService;

var _require2 = require('../models'),
    User = _require2.User;

var createUser = catchAsync(function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(userService.createUser(req.body));

        case 2:
          user = _context.sent;
          res.status(httpStatus.CREATED).send(user);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
var getUsers = catchAsync(function _callee2(req, res) {
  var filter, options, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          filter = pick(req.query, ['name', 'role']);
          options = pick(req.query, ['sortBy', 'limit', 'page']);
          _context2.next = 4;
          return regeneratorRuntime.awrap(userService.queryUsers(filter, options));

        case 4:
          result = _context2.sent;
          res.send(result);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getUser = catchAsync(function _callee3(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(userService.getUserById(req.params.userId));

        case 2:
          user = _context3.sent;

          if (user) {
            _context3.next = 5;
            break;
          }

          throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

        case 5:
          res.send(user);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var completeImageUpload = catchAsync(function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log(req.file);
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.key, {
            profile: req.file.filename
          }, {
            "new": true,
            useFindAndModify: true
          }));

        case 3:
          user = _context4.sent;
          console.log(user); // global.socketio.emit('fetch_notifications');

          res.status(httpStatus.CREATED).send(user);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var updateUser = catchAsync(function _callee5(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(userService.updateUserById(req.params.userId, req.body));

        case 2:
          user = _context5.sent;
          res.send(user);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var currentUser = catchAsync(function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res.send({
            currentUser: {
              id: 187135,
              name: 'Lord Gaben',
              email: 'gaben@jira.guest',
              avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
              createdAt: '2021-11-21T07:18:51.936Z',
              updatedAt: '2021-11-21T07:18:51.949Z',
              projectId: 62131
            }
          });

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
var deleteUser = catchAsync(function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(userService.deleteUserById(req.params.userId));

        case 2:
          res.status(httpStatus.NO_CONTENT).send();

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
});
module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  currentUser: currentUser,
  completeImageUpload: completeImageUpload
};