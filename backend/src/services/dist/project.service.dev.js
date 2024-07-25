"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var httpStatus = require('http-status');

var _require = require('../models'),
    Project = _require.Project,
    Organization = _require.Organization,
    Issue = _require.Issue,
    Epic = _require.Epic,
    Invitation = _require.Invitation,
    User = _require.User;

var ApiError = require('../utils/ApiError');

var _require2 = require('./email.service'),
    sendInvitationEmail = _require2.sendInvitationEmail;

var createProject = function createProject(projectBody) {
  return regeneratorRuntime.async(function createProject$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Project.isNameTaken(projectBody.name, projectBody.orgId));

        case 2:
          if (!_context.sent) {
            _context.next = 4;
            break;
          }

          throw new ApiError(httpStatus.BAD_REQUEST, 'Project name already taken');

        case 4:
          return _context.abrupt("return", Project.create(projectBody));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getProjectsForUser = function getProjectsForUser(id) {
  var user, query;
  return regeneratorRuntime.async(function getProjectsForUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findById(id));

        case 2:
          user = _context2.sent;

          if (user.role === 'owner') {
            query = {
              path: 'projects',
              populate: {
                path: 'projectLead',
                select: {
                  name: 1
                }
              }
            };
          } else {
            query = {
              path: 'projects',
              populate: {
                path: 'projectLead',
                select: {
                  name: 1
                }
              },
              match: {
                _id: {
                  $in: user.projects
                }
              }
            };
          }

          return _context2.abrupt("return", Organization.findById(user.orgId).populate('members').populate('owner').populate(query));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getProjectById = function getProjectById(id) {
  var project, epics, epicIds, issues, users, result;
  return regeneratorRuntime.async(function getProjectById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Project.findById(id).populate('projectLead'));

        case 3:
          project = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Epic.find({
            projectId: id
          }));

        case 6:
          epics = _context3.sent;
          epicIds = epics.map(function (epic) {
            return epic._id;
          });
          _context3.next = 10;
          return regeneratorRuntime.awrap(Issue.find({
            epicId: {
              $in: epicIds
            }
          }));

        case 10:
          issues = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(User.find({
            projects: project._id
          }));

        case 13:
          users = _context3.sent;
          result = {
            project: _objectSpread({}, project._doc, {
              epics: epics,
              issues: issues,
              users: users
            })
          };
          return _context3.abrupt("return", result);

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", _context3.t0);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

var updateProjectById = function updateProjectById(projectId, updateBody) {
  var project;
  return regeneratorRuntime.async(function updateProjectById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Project.findOneAndUpdate({
            _id: projectId
          }, updateBody, {
            "new": true,
            useFindAndModify: true
          }));

        case 2:
          project = _context4.sent;
          return _context4.abrupt("return", project);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var deleteProjectById = function deleteProjectById(projectId) {
  var epics, epicIds;
  return regeneratorRuntime.async(function deleteProjectById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Epic.find({
            projectId: projectId
          }));

        case 2:
          epics = _context5.sent;
          epicIds = epics.map(function (epic) {
            return epic._id;
          });
          _context5.next = 6;
          return regeneratorRuntime.awrap(Issue.remove({
            epicId: {
              $in: epicIds
            }
          }));

        case 6:
          _context5.next = 8;
          return regeneratorRuntime.awrap(Epic.remove({
            projectId: projectId
          }));

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(User.updateOne({
            projects: projectId
          }, {
            $pull: {
              projects: projectId
            }
          }));

        case 10:
          _context5.next = 12;
          return regeneratorRuntime.awrap(Organization.updateOne({
            projects: projectId
          }, {
            $pull: {
              projects: projectId
            }
          }));

        case 12:
          _context5.next = 14;
          return regeneratorRuntime.awrap(Invitation.remove({
            projectId: projectId
          }));

        case 14:
          _context5.next = 16;
          return regeneratorRuntime.awrap(Project.remove({
            _id: projectId
          }));

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var inviteMember = function inviteMember(invitationBody, url) {
  var user, invitation, project, org;
  return regeneratorRuntime.async(function inviteMember$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: invitationBody.email,
            projects: invitationBody.projectId
          }));

        case 2:
          user = _context6.sent;

          if (!user) {
            _context6.next = 5;
            break;
          }

          throw new ApiError(httpStatus.CONFLICT, 'Already a member!');

        case 5:
          if (!(invitationBody.type !== 'org')) {
            _context6.next = 13;
            break;
          }

          _context6.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: invitationBody.email,
            orgId: invitationBody.orgId
          }));

        case 8:
          user = _context6.sent;

          if (!user) {
            _context6.next = 13;
            break;
          }

          _context6.next = 12;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            email: invitationBody.email,
            orgId: invitationBody.orgId
          }, {
            $push: {
              projects: invitationBody.projectId
            }
          }));

        case 12:
          return _context6.abrupt("return");

        case 13:
          _context6.next = 15;
          return regeneratorRuntime.awrap(User.findOne({
            email: invitationBody.email
          }));

        case 15:
          user = _context6.sent;

          if (!user) {
            _context6.next = 18;
            break;
          }

          throw new ApiError(httpStatus.CONFLICT, 'User is a part of different organization!');

        case 18:
          _context6.next = 20;
          return regeneratorRuntime.awrap(Invitation.create(invitationBody));

        case 20:
          invitation = _context6.sent;

          if (!(invitationBody.type !== 'org')) {
            _context6.next = 26;
            break;
          }

          _context6.next = 24;
          return regeneratorRuntime.awrap(Project.findById(invitation.projectId));

        case 24:
          project = _context6.sent;
          project = project.name;

        case 26:
          _context6.next = 28;
          return regeneratorRuntime.awrap(Organization.findById(invitation.orgId));

        case 28:
          org = _context6.sent;
          _context6.prev = 29;
          _context6.next = 32;
          return regeneratorRuntime.awrap(sendInvitationEmail(invitation.email, invitation.invitationCode, project, org.name, url));

        case 32:
          _context6.next = 37;
          break;

        case 34:
          _context6.prev = 34;
          _context6.t0 = _context6["catch"](29);
          throw new Error(_context6.t0);

        case 37:
          return _context6.abrupt("return", invitation);

        case 38:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[29, 34]]);
};

var startSprint = function startSprint(projectId, noOfWeeks) {
  var timeInFuture, epicIds;
  return regeneratorRuntime.async(function startSprint$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          timeInFuture = 1.21e9;
          if (noOfWeeks === 3) timeInFuture = 1.814e9;
          if (noOfWeeks === 4) timeInFuture = 2.419e9;
          _context7.next = 5;
          return regeneratorRuntime.awrap(Epic.find({
            projectId: projectId
          }, {
            _id: 1
          }));

        case 5:
          _context7.t0 = function (epic) {
            return epic._id;
          };

          epicIds = _context7.sent.map(_context7.t0);
          _context7.next = 9;
          return regeneratorRuntime.awrap(Issue.updateMany({
            epicId: {
              $in: epicIds
            },
            status: 'planned'
          }, {
            status: 'ready'
          }));

        case 9:
          _context7.next = 11;
          return regeneratorRuntime.awrap(Issue.updateMany({
            epicId: {
              $in: epicIds
            },
            previousSprintStatus: {
              $in: ['ready', 'blocked', 'inProgress', 'inQa']
            }
          }, [{
            $set: {
              status: '$previousSprintStatus',
              previousSprintStatus: null
            }
          }]));

        case 11:
          return _context7.abrupt("return", Project.findByIdAndUpdate(projectId, {
            sprintStatus: 'active',
            sprintStartDate: Date.now(),
            sprintEndDate: Date.now() + timeInFuture,
            $inc: {
              sprintNumber: 1
            }
          }, {
            "new": true
          }));

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var endSprint = function endSprint(projectId) {
  var epicIds;
  return regeneratorRuntime.async(function endSprint$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(Epic.find({
            projectId: projectId
          }, {
            _id: 1
          }));

        case 2:
          _context8.t0 = function (epic) {
            return epic._id;
          };

          epicIds = _context8.sent.map(_context8.t0);
          _context8.next = 6;
          return regeneratorRuntime.awrap(Issue.updateMany({
            epicId: {
              $in: epicIds
            },
            status: 'done'
          }, {
            status: 'archived'
          }));

        case 6:
          return _context8.abrupt("return", Project.findByIdAndUpdate(projectId, {
            sprintStatus: 'inactive',
            sprintStartDate: null,
            SprintEndDate: null
          }, {
            "new": true
          }));

        case 7:
        case "end":
          return _context8.stop();
      }
    }
  });
};

module.exports = {
  createProject: createProject,
  getProjectsForUser: getProjectsForUser,
  getProjectById: getProjectById,
  updateProjectById: updateProjectById,
  deleteProjectById: deleteProjectById,
  inviteMember: inviteMember,
  startSprint: startSprint,
  endSprint: endSprint
};