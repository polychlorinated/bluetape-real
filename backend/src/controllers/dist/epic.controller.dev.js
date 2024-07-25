"use strict";

var httpStatus = require('http-status'); // const pick = require('../utils/pick');


var ApiError = require('../utils/ApiError');

var catchAsync = require('../utils/catchAsync');

var _require = require('../services'),
    epicService = _require.epicService;

var _require2 = require('../models'),
    Project = _require2.Project;

var createEpic = catchAsync(function _callee(req, res) {
  var epic;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body, 'epicepicepicepicepicepicepic');
          _context.next = 3;
          return regeneratorRuntime.awrap(epicService.createEpic(req.body));

        case 3:
          epic = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(Project.findOneAndUpdate({
            _id: epic.projectId
          }, {
            $inc: {
              totalEpics: 1
            }
          }));

        case 6:
          if (epic) {
            _context.next = 8;
            break;
          }

          throw new ApiError(httpStatus.NOT_FOUND, 'Epic not found');

        case 8:
          res.status(httpStatus.CREATED).send(epic);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});
var getEpicsForProject = catchAsync(function _callee2(req, res) {
  var result, sendR;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(epicService.getEpicsForProject(req.params.projectId));

        case 2:
          result = _context2.sent;
          sendR = result.filter(function (el) {
            return el.totalIssues !== 0;
          });

          if (result) {
            _context2.next = 6;
            break;
          }

          throw new ApiError(httpStatus.NOT_FOUND, 'Epics not found');

        case 6:
          res.send(sendR);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getEpicById = catchAsync(function _callee3(req, res) {
  var epic;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(epicService.getEpicById(req.params.epicId));

        case 2:
          epic = _context3.sent;
          console.log('runrunnrunnrunnn');

          if (epic) {
            _context3.next = 6;
            break;
          }

          throw new ApiError(httpStatus.NOT_FOUND, 'Epic not found');

        case 6:
          res.send(epic);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var updateEpicById = catchAsync(function _callee4(req, res) {
  var epic;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(epicService.updateEpicById(req.params.epicId, req.body));

        case 2:
          epic = _context4.sent;
          res.send(epic);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var deleteEpicById = catchAsync(function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(epicService.deleteEpicById(req.params.epicId));

        case 2:
          res.status(httpStatus.NO_CONTENT).send();

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = {
  createEpic: createEpic,
  getEpicsForProject: getEpicsForProject,
  getEpicById: getEpicById,
  updateEpicById: updateEpicById,
  deleteEpicById: deleteEpicById
};