const httpStatus = require('http-status');
const path = require('path');

const catchAsync = require('../utils/catchAsync');
const { commentService, notificationService } = require('../services');
const { Issue, Epic, User, Project, Comment } = require('../models');
const getUserFromBearerToken = require('../utils/getBearerToken');

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment(req.body);
  const issue = await Issue.findOneAndUpdate({ _id: comment.issueId }, { $push: { comments: comment } });
  await Epic.findOneAndUpdate({ _id: comment.issueId }, { $push: { comments: comment } });
  if (issue) {
    const epic = await Epic.findById(issue.epicId);
    const project = await Project.findById(epic.projectId);
    const sender = await User.findById(getUserFromBearerToken(req));
    let receiver;
    receiver = [issue.reporterId, issue.assigneeId];

    if (sender._id.equals(issue.assigneeId)) {
      receiver = [issue.reporterId];
    }

    if (sender._id.equals(issue.reporterId)) {
      receiver = [issue.assigneeId];
    }

    for (let i = 0; i < receiver.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await notificationService.createNotification({
        sender: sender._id,
        receiver: receiver[i],
        read: false,
        type: 'added_comment',
        issue: issue._id,
        project: project._id,
        message: `A comment was added to ${issue.key} by ${sender.name} at ${comment.createdAt}`,
      });
    }
  }
  global.socketio.emit('fetch_notifications');
  res.status(httpStatus.CREATED).send(comment);
});

const fileExists = async (pa) => !!(await fs.promises.stat(pa).catch((e) => false));

const completeImageUpload = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.key,
    { file: req.file.filename },
    { new: true, useFindAndModify: true }
  );

  // global.socketio.emit('fetch_notifications');
  res.status(httpStatus.CREATED).send(comment);
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateComment(req.params.commentId, req.body);
  const issue = await Issue.findOne({ _id: comment.issueId });
  const epic = await Epic.findById(issue.epicId);
  const project = await Project.findById(epic.projectId);
  if (issue) {
    const sender = await User.findById(getUserFromBearerToken(req));
    let receiver;
    receiver = [issue.reporterId, issue.assigneeId];
    if (sender._id.equals(issue.assigneeId)) {
      receiver = [issue.reporterId];
    }
    if (sender._id.equals(issue.reporterId)) {
      receiver = [issue.assigneeId];
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < receiver.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await notificationService.createNotification({
        sender: sender._id,
        receiver: receiver[i],
        read: false,
        type: 'added_comment',
        issue: issue._id,
        project: project._id,
        message: `A comment was updated by ${sender.name} on ${issue.key} at ${comment.createdAt}`,
      });
    }
    // global.socketio.emit('fetch_notifications');
  }
  res.send(comment);
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteComment(req.params.commentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  completeImageUpload,
};
