"use strict";

var httpStatus = require('http-status'); // const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');


var catchAsync = require('../utils/catchAsync');

var _require = require('../services'),
    issueService = _require.issueService,
    notificationService = _require.notificationService;

var _require2 = require('../models'),
    Epic = _require2.Epic,
    User = _require2.User,
    Issue = _require2.Issue,
    Project = _require2.Project;

var ApiError = require('../utils/ApiError');

var getUserFromBearerToken = require('../utils/getBearerToken');

var createIssue = catchAsync(function _callee(req, res) {
  var issue, epic, project, sender;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(issueService.createIssue(req.body));

        case 2:
          issue = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Epic.findOneAndUpdate({
            _id: issue.epicId
          }, {
            $inc: {
              totalIssues: 1
            }
          }, {
            "new": true
          }));

        case 5:
          epic = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Project.findById(epic.projectId));

        case 8:
          project = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(User.findById(getUserFromBearerToken(req)));

        case 11:
          sender = _context.sent;

          if (sender._id.equals(issue.assigneeId)) {
            _context.next = 15;
            break;
          }

          _context.next = 15;
          return regeneratorRuntime.awrap(notificationService.createNotification({
            sender: sender._id,
            receiver: issue.assigneeId,
            read: false,
            type: 'updated_issue',
            issue: issue._id,
            project: project._id,
            message: "".concat(sender.name, " assigned ").concat(issue.key, " to you")
          }));

        case 15:
          // global.socketio.emit('fetch_notifications');
          res.status(httpStatus.CREATED).send(issue);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
var completeImageUpload = catchAsync(function _callee2(req, res) {
  var issue;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Issue.findOneAndUpdate({
            key: req.params.key.split('*').join('.')
          }, {
            file: req.file.filename
          }, {
            "new": true,
            useFindAndModify: true
          }));

        case 2:
          issue = _context2.sent;
          // global.socketio.emit('fetch_notifications');
          res.status(httpStatus.CREATED).send(issue);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var createReview = catchAsync(function _callee3(req, res) {
  var issue;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Issue.findByIdAndUpdate(req.body.issueId, {
            review: {
              body: req.body.body,
              rating: req.body.rating
            }
          }, {
            "new": true,
            useFindAndModify: true
          }));

        case 2:
          issue = _context3.sent;
          // global.socketio.emit('fetch_notifications');
          res.status(httpStatus.CREATED).send(issue);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var getIssuesForEpic = catchAsync(function _callee4(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(issueService.getIssuesForEpic(req.params.epicId));

        case 2:
          result = _context4.sent;
          res.send(result);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var getIssueById = catchAsync(function _callee5(req, res) {
  var issue;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(issueService.getIssueById(req.params.issueId));

        case 2:
          issue = _context5.sent;

          if (issue) {
            _context5.next = 5;
            break;
          }

          throw new ApiError(httpStatus.NOT_FOUND, 'Issue not found');

        case 5:
          res.send(issue);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var updateIssueById = catchAsync(function _callee6(req, res) {
  var oldIssue, issue, epic, project, sender, receiver, i;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Issue.findById(req.params.issueId));

        case 2:
          oldIssue = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(issueService.updateIssueById(req.params.issueId, req.body));

        case 5:
          issue = _context6.sent;
          _context6.next = 8;
          return regeneratorRuntime.awrap(Epic.findById(issue.epicId));

        case 8:
          epic = _context6.sent;
          _context6.next = 11;
          return regeneratorRuntime.awrap(Project.findById(epic.projectId));

        case 11:
          project = _context6.sent;
          _context6.next = 14;
          return regeneratorRuntime.awrap(User.findById(getUserFromBearerToken(req)));

        case 14:
          sender = _context6.sent;

          if (!(!sender._id.equals(oldIssue.assigneeId) && req.body.assigneeId)) {
            _context6.next = 18;
            break;
          }

          _context6.next = 18;
          return regeneratorRuntime.awrap(notificationService.createNotification({
            sender: sender._id,
            receiver: oldIssue.assigneeId,
            read: false,
            type: 'updated_issue',
            issue: issue._id,
            project: project._id,
            message: "".concat(sender.name, " unassigned ").concat(issue.key, " from you")
          }));

        case 18:
          if (!(!sender._id.equals(oldIssue.reporterId) && req.body.reporterId)) {
            _context6.next = 21;
            break;
          }

          _context6.next = 21;
          return regeneratorRuntime.awrap(notificationService.createNotification({
            sender: sender._id,
            receiver: oldIssue.reporterId,
            read: false,
            type: 'updated_issue',
            issue: issue._id,
            project: project._id,
            message: "".concat(sender.name, " updated ").concat(issue.key, " that you're watching")
          }));

        case 21:
          if (issue.assigneeId && !issue.assigneeId.equals(issue.reporterId)) {
            receiver = [issue.reporterId, issue.assigneeId];
          }

          if (!sender._id.equals(issue.reporterId) && !sender._id.equals(issue.assigneeId)) {
            if (issue.assigneeId && issue.assigneeId.equals(issue.reporterId)) {
              receiver = [issue.assigneeId];
            } else {
              receiver = [issue.reporterId, issue.assigneeId];
            }
          }

          if (sender._id.equals(issue.assigneeId)) {
            receiver = [issue.reporterId];
          }

          if (sender._id.equals(issue.reporterId)) {
            receiver = [issue.assigneeId];
          }

          if (sender._id.equals(issue.reporterId) && sender._id.equals(issue.assigneeId)) {
            receiver = [];
          } // eslint-disable-next-line no-plusplus


          i = 0;

        case 27:
          if (!(i < receiver.length)) {
            _context6.next = 33;
            break;
          }

          _context6.next = 30;
          return regeneratorRuntime.awrap(notificationService.createNotification({
            sender: sender._id,
            receiver: receiver[i],
            read: false,
            type: 'updated_issue',
            issue: issue._id,
            project: project._id,
            message: receiver[i] === issue.assigneeId && !sender._id.equals(issue.assigneeId) && req.body.assigneeId ? "".concat(sender.name, " assigned ").concat(issue.key, " to you") : "".concat(sender.name, " updated ").concat(issue.key, " that you're watching")
          }));

        case 30:
          i++;
          _context6.next = 27;
          break;

        case 33:
          // global.socketio.emit('fetch_notifications');
          res.send(issue);

        case 34:
        case "end":
          return _context6.stop();
      }
    }
  });
});
var deleteIssueById = catchAsync(function _callee7(req, res) {
  var oldIssue, epic, project, sender, receiver, i;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Issue.findById(req.params.issueId));

        case 2:
          oldIssue = _context7.sent;
          _context7.next = 5;
          return regeneratorRuntime.awrap(Epic.findById(oldIssue.epicId));

        case 5:
          epic = _context7.sent;
          _context7.next = 8;
          return regeneratorRuntime.awrap(Project.findById(epic.projectId));

        case 8:
          project = _context7.sent;
          _context7.next = 11;
          return regeneratorRuntime.awrap(issueService.deleteIssueById(req.params.issueId));

        case 11:
          if (!oldIssue) {
            _context7.next = 27;
            break;
          }

          _context7.next = 14;
          return regeneratorRuntime.awrap(User.findById(getUserFromBearerToken(req)));

        case 14:
          sender = _context7.sent;
          receiver = [oldIssue.reporterId, oldIssue.assigneeId];

          if (sender._id.equals(oldIssue.assigneeId)) {
            receiver = [oldIssue.reporterId];
          }

          if (sender._id.equals(oldIssue.reporterId)) {
            receiver = [oldIssue.assigneeId];
          }

          if (oldIssue.reporterId.equals(oldIssue.reporterId)) {
            receiver = [oldIssue.assigneeId];
          } // eslint-disable-next-line no-plusplus


          i = 0;

        case 20:
          if (!(i < receiver.length)) {
            _context7.next = 26;
            break;
          }

          _context7.next = 23;
          return regeneratorRuntime.awrap(notificationService.createNotification({
            sender: sender._id,
            receiver: receiver[i],
            read: false,
            type: 'deleted_issue',
            project: project._id,
            message: "".concat(oldIssue.key, " was deleted by ").concat(sender.name)
          }));

        case 23:
          i++;
          _context7.next = 20;
          break;

        case 26:
          // global.socketio.emit('fetch_notifications');
          res.status(httpStatus.NO_CONTENT).send();

        case 27:
        case "end":
          return _context7.stop();
      }
    }
  });
});
module.exports = {
  createIssue: createIssue,
  getIssuesForEpic: getIssuesForEpic,
  getIssueById: getIssueById,
  updateIssueById: updateIssueById,
  deleteIssueById: deleteIssueById,
  completeImageUpload: completeImageUpload,
  createReview: createReview
};