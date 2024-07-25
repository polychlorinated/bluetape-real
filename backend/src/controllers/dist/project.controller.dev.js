"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var httpStatus = require('http-status');

var fs = require('fs');

var path = require('path');

var catchAsync = require('../utils/catchAsync');

var _require = require('../services'),
    projectService = _require.projectService,
    notificationService = _require.notificationService;

var _require2 = require('../services/organization.service'),
    addProjectToOrgById = _require2.addProjectToOrgById;

var ApiError = require('../utils/ApiError');

var _require3 = require('../models'),
    User = _require3.User,
    Project = _require3.Project,
    Notification = _require3.Notification,
    Organization = _require3.Organization;

var getUserFromBearerToken = require('../utils/getBearerToken');

var _require4 = require('../services'),
    epicService = _require4.epicService;

var hardEpics = require('./epicData.json');

var createProject = catchAsync(function _callee4(req, res) {
  var owners, halfOwners, project, epic;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.find({
            role: 'owner',
            orgId: req.params.id
          }));

        case 3:
          owners = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(User.find({
            role: 'owner',
            orgId: req.params.id,
            isHalfOwner: true
          }));

        case 6:
          halfOwners = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(projectService.createProject(req.body));

        case 9:
          project = _context4.sent;
          halfOwners.forEach(function _callee(hOwner) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(Project.findByIdAndUpdate(project._id, {
                      $push: {
                        members: hOwner._id
                      }
                    }));

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          owners.forEach(function _callee2(owner) {
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (owner._id.equals(project.projectLead)) {
                      _context2.next = 3;
                      break;
                    }

                    _context2.next = 3;
                    return regeneratorRuntime.awrap(User.findOneAndUpdate({
                      role: 'owner',
                      orgId: req.params.id
                    }, {
                      $push: {
                        projects: project._id
                      }
                    }));

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });
          _context4.next = 14;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: project.projectLead
          }, {
            $push: {
              projects: project._id
            }
          }));

        case 14:
          _context4.next = 16;
          return regeneratorRuntime.awrap(addProjectToOrgById({
            orgId: req.params.id,
            project: project._id
          }));

        case 16:
          hardEpics.forEach(function _callee3(epi) {
            var ep;
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    ep = epi;
                    ep = _objectSpread({}, ep, {
                      projectId: project._id,
                      key: "".concat(project.name.split(' ').join('-').toUpperCase(), "-").concat(ep.key)
                    });
                    _context3.next = 4;
                    return regeneratorRuntime.awrap(epicService.createEpic(ep));

                  case 4:
                    epic = _context3.sent;
                    _context3.next = 7;
                    return regeneratorRuntime.awrap(Project.findOneAndUpdate({
                      _id: epic.projectId
                    }, {
                      $inc: {
                        totalEpics: 1
                      }
                    }));

                  case 7:
                    if (epic) {
                      _context3.next = 9;
                      break;
                    }

                    throw new ApiError(httpStatus.NOT_FOUND, 'Epic not found');

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });
          res.status(httpStatus.CREATED).send(project);
          _context4.next = 23;
          break;

        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send("".concat(_context4.t0.message, "!"));

        case 23:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 20]]);
}); ///Check if file exists

var fileExists = function fileExists(path) {
  return regeneratorRuntime.async(function fileExists$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(fs.promises.stat(path)["catch"](function (e) {
            return false;
          }));

        case 2:
          return _context5.abrupt("return", !!_context5.sent);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var completeImageUpload = catchAsync(function _callee5(req, res, next) {
  var issueC, file, fileName, fileCheck, issue;
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Project.findOne({
            key: req.params.key
          }));

        case 2:
          issueC = _context6.sent;
          file = issueC.file;

          if (!file) {
            _context6.next = 10;
            break;
          }

          fileName = file;
          _context6.next = 8;
          return regeneratorRuntime.awrap(fileExists(path.join("".concat(__dirname, "/../../uploads/files"), fileName)));

        case 8:
          fileCheck = _context6.sent;

          if (fileCheck) {
            fs.unlink(path.join("".concat(__dirname, "/../../uploads/files"), fileName), function (err) {
              if (err) {
                next(new ApiError('Failed to delete flie', 404));
              }

              return;
            });
          }

        case 10:
          _context6.next = 12;
          return regeneratorRuntime.awrap(Project.findOneAndUpdate({
            key: req.params.key
          }, {
            file: req.file.filename
          }, {
            "new": true,
            useFindAndModify: true
          }));

        case 12:
          issue = _context6.sent;
          // global.socketio.emit('fetch_notifications');
          res.status(httpStatus.CREATED).send(issue);

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  });
});
var getProjectsForUser = catchAsync(function _callee6(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(projectService.getProjectsForUser(req.params.id));

        case 2:
          result = _context7.sent;
          // global.socketio.emit('fetch_notifications');
          res.send(result);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
var getProjectById = catchAsync(function _callee7(req, res) {
  var project;
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(projectService.getProjectById(req.params.projectId));

        case 2:
          project = _context8.sent;

          if (project) {
            _context8.next = 5;
            break;
          }

          throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');

        case 5:
          res.send(project);

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
});
var inviteMemberToProject = catchAsync(function _callee8(req, res) {
  var resetURL, invitation;
  return regeneratorRuntime.async(function _callee8$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          resetURL = "".concat(req.protocol, "://").concat(req.get('host'));
          _context9.next = 3;
          return regeneratorRuntime.awrap(projectService.inviteMember(req.body, resetURL));

        case 3:
          invitation = _context9.sent;
          res.send(invitation);

        case 5:
        case "end":
          return _context9.stop();
      }
    }
  });
});
var updateProjectById = catchAsync(function _callee9(req, res) {
  var project;
  return regeneratorRuntime.async(function _callee9$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(projectService.updateProjectById(req.params.projectId, req.body));

        case 2:
          project = _context10.sent;
          res.send(project);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
var deleteProjectById = catchAsync(function _callee10(req, res) {
  var project, notification, file, fileName, fileCheck;
  return regeneratorRuntime.async(function _callee10$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(Project.findByIdAndDelete(req.params.projectId));

        case 2:
          project = _context11.sent;
          _context11.next = 5;
          return regeneratorRuntime.awrap(Notification.deleteMany({
            project: project._id
          }));

        case 5:
          notification = _context11.sent;
          file = project.file;

          if (!file) {
            _context11.next = 13;
            break;
          }

          fileName = file;
          _context11.next = 11;
          return regeneratorRuntime.awrap(fileExists(path.join("".concat(__dirname, "/../../uploads/files"), fileName)));

        case 11:
          fileCheck = _context11.sent;

          if (fileCheck) {
            fs.unlink(path.join("".concat(__dirname, "/../../uploads/files"), fileName), function (err) {
              if (err) {
                return new ApiError('Failed to delete flie', 404);
              }
            });
          }

        case 13:
          res.status(httpStatus.NO_CONTENT).send();

        case 14:
        case "end":
          return _context11.stop();
      }
    }
  });
});
var startSprint = catchAsync(function _callee11(req, res) {
  var project, sender, projectMembers, receiver, i;
  return regeneratorRuntime.async(function _callee11$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(projectService.startSprint(req.params.projectId, req.body.noOfWeeks));

        case 2:
          project = _context12.sent;
          _context12.next = 5;
          return regeneratorRuntime.awrap(User.findById(getUserFromBearerToken(req)));

        case 5:
          sender = _context12.sent;
          _context12.next = 8;
          return regeneratorRuntime.awrap(User.find({
            projects: project._id
          }));

        case 8:
          projectMembers = _context12.sent;
          receiver = projectMembers.map(function (member) {
            return member._id;
          }).filter(function (userId) {
            return !userId.equals(sender._id);
          }); // eslint-disable-next-line no-plusplus

          i = 0;

        case 11:
          if (!(i < receiver.length)) {
            _context12.next = 17;
            break;
          }

          _context12.next = 14;
          return regeneratorRuntime.awrap(notificationService.createNotification({
            sender: sender._id,
            receiver: receiver[i],
            read: false,
            type: 'started_sprint',
            project: project._id,
            message: "Sprint for project ".concat(project.name, " has been started by ").concat(sender.name)
          }));

        case 14:
          i++;
          _context12.next = 11;
          break;

        case 17:
          // global.socketio.emit('fetch_notifications');
          res.sendStatus(200);

        case 18:
        case "end":
          return _context12.stop();
      }
    }
  });
});
var endSprint = catchAsync(function _callee12(req, res) {
  var project, sender, projectMembers, receiver, i;
  return regeneratorRuntime.async(function _callee12$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(projectService.endSprint(req.params.projectId));

        case 2:
          project = _context13.sent;
          _context13.next = 5;
          return regeneratorRuntime.awrap(User.findById(getUserFromBearerToken(req)));

        case 5:
          sender = _context13.sent;
          _context13.next = 8;
          return regeneratorRuntime.awrap(User.find({
            projects: project._id
          }));

        case 8:
          projectMembers = _context13.sent;
          receiver = projectMembers.map(function (member) {
            return member._id;
          }).filter(function (userId) {
            return !userId.equals(sender._id);
          }); // eslint-disable-next-line no-plusplus

          i = 0;

        case 11:
          if (!(i < receiver.length)) {
            _context13.next = 17;
            break;
          }

          _context13.next = 14;
          return regeneratorRuntime.awrap(notificationService.createNotification({
            sender: sender._id,
            receiver: receiver[i],
            read: false,
            type: 'ended_sprint',
            project: project._id,
            message: "Sprint for project ".concat(project.name, " has been ended by ").concat(sender.name)
          }));

        case 14:
          i++;
          _context13.next = 11;
          break;

        case 17:
          // global.socketio.emit('fetch_notifications');
          res.sendStatus(200);

        case 18:
        case "end":
          return _context13.stop();
      }
    }
  });
});
module.exports = {
  createProject: createProject,
  getProjectsForUser: getProjectsForUser,
  getProjectById: getProjectById,
  updateProjectById: updateProjectById,
  deleteProjectById: deleteProjectById,
  inviteMemberToProject: inviteMemberToProject,
  startSprint: startSprint,
  endSprint: endSprint,
  completeImageUpload: completeImageUpload
};