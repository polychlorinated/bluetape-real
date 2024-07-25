"use strict";

var httpStatus = require('http-status');

var path = require('path');

var catchAsync = require('../utils/catchAsync');

var _require = require('../services'),
    commentService = _require.commentService,
    notificationService = _require.notificationService;

var _require2 = require('../models'),
    Issue = _require2.Issue,
    Epic = _require2.Epic,
    User = _require2.User,
    Project = _require2.Project,
    Comment = _require2.Comment;

var getUserFromBearerToken = require('../utils/getBearerToken');

var createComment = catchAsync(function _callee(req, res) {
  var comment, issue, epic, project, sender, receiver, i;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(commentService.createComment(req.body));

        case 2:
          comment = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Issue.findOneAndUpdate({
            _id: comment.issueId
          }, {
            $push: {
              comments: comment
            }
          }));

        case 5:
          issue = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Epic.findOneAndUpdate({
            _id: comment.issueId
          }, {
            $push: {
              comments: comment
            }
          }));

        case 8:
          if (!issue) {
            _context.next = 28;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(Epic.findById(issue.epicId));

        case 11:
          epic = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(Project.findById(epic.projectId));

        case 14:
          project = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(User.findById(getUserFromBearerToken(req)));

        case 17:
          sender = _context.sent;
          receiver = [issue.reporterId, issue.assigneeId];

          if (sender._id.equals(issue.assigneeId)) {
            receiver = [issue.reporterId];
          }

          if (sender._id.equals(issue.reporterId)) {
            receiver = [issue.assigneeId];
          }

          i = 0;

        case 22:
          if (!(i < receiver.length)) {
            _context.next = 28;
            break;
          }

          _context.next = 25;
          return regeneratorRuntime.awrap(notificationService.createNotification({
            sender: sender._id,
            receiver: receiver[i],
            read: false,
            type: 'added_comment',
            issue: issue._id,
            project: project._id,
            message: "A comment was added to ".concat(issue.key, " by ").concat(sender.name, " at ").concat(comment.createdAt)
          }));

        case 25:
          i += 1;
          _context.next = 22;
          break;

        case 28:
          global.socketio.emit('fetch_notifications');
          res.status(httpStatus.CREATED).send(comment);

        case 30:
        case "end":
          return _context.stop();
      }
    }
  });
});

var fileExists = function fileExists(pa) {
  return regeneratorRuntime.async(function fileExists$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fs.promises.stat(pa)["catch"](function (e) {
            return false;
          }));

        case 2:
          return _context2.abrupt("return", !!_context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var completeImageUpload = catchAsync(function _callee2(req, res, next) {
  var comment;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Comment.findByIdAndUpdate(req.params.key, {
            file: req.file.filename
          }, {
            "new": true,
            useFindAndModify: true
          }));

        case 2:
          comment = _context3.sent;
          // global.socketio.emit('fetch_notifications');
          res.status(httpStatus.CREATED).send(comment);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var updateComment = catchAsync(function _callee3(req, res) {
  var comment, issue, epic, project, sender, receiver, i;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(commentService.updateComment(req.params.commentId, req.body));

        case 2:
          comment = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Issue.findOne({
            _id: comment.issueId
          }));

        case 5:
          issue = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(Epic.findById(issue.epicId));

        case 8:
          epic = _context4.sent;
          _context4.next = 11;
          return regeneratorRuntime.awrap(Project.findById(epic.projectId));

        case 11:
          project = _context4.sent;

          if (!issue) {
            _context4.next = 26;
            break;
          }

          _context4.next = 15;
          return regeneratorRuntime.awrap(User.findById(getUserFromBearerToken(req)));

        case 15:
          sender = _context4.sent;
          receiver = [issue.reporterId, issue.assigneeId];

          if (sender._id.equals(issue.assigneeId)) {
            receiver = [issue.reporterId];
          }

          if (sender._id.equals(issue.reporterId)) {
            receiver = [issue.assigneeId];
          } // eslint-disable-next-line no-plusplus


          i = 0;

        case 20:
          if (!(i < receiver.length)) {
            _context4.next = 26;
            break;
          }

          _context4.next = 23;
          return regeneratorRuntime.awrap(notificationService.createNotification({
            sender: sender._id,
            receiver: receiver[i],
            read: false,
            type: 'added_comment',
            issue: issue._id,
            project: project._id,
            message: "A comment was updated by ".concat(sender.name, " on ").concat(issue.key, " at ").concat(comment.createdAt)
          }));

        case 23:
          i++;
          _context4.next = 20;
          break;

        case 26:
          res.send(comment);

        case 27:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var deleteComment = catchAsync(function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(commentService.deleteComment(req.params.commentId));

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
  createComment: createComment,
  updateComment: updateComment,
  deleteComment: deleteComment,
  completeImageUpload: completeImageUpload
};