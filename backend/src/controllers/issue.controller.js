const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { issueService, notificationService } = require('../services');
const { Epic, User, Issue, Project } = require('../models');
const ApiError = require('../utils/ApiError');
const getUserFromBearerToken = require('../utils/getBearerToken');

const createIssue = catchAsync(async (req, res) => {
  const issue = await issueService.createIssue(req.body);
  const epic = await Epic.findOneAndUpdate({ _id: issue.epicId }, { $inc: { totalIssues: 1 } }, { new: true });
  const project = await Project.findById(epic.projectId);
  const sender = await User.findById(getUserFromBearerToken(req));
  if (!sender._id.equals(issue.assigneeId)) {
    await notificationService.createNotification({
      sender: sender._id,
      receiver: issue.assigneeId,
      read: false,
      type: 'updated_issue',
      issue: issue._id,
      project: project._id,
      message: `${sender.name} assigned ${issue.key} to you`,
    });
  }
  // global.socketio.emit('fetch_notifications');
  res.status(httpStatus.CREATED).send(issue);
});
const completeImageUpload = catchAsync(async (req, res) => {
  const issue = await Issue.findOneAndUpdate(
    { key: req.params.key.split('*').join('.') },
    { file: req.file.filename },
    { new: true, useFindAndModify: true }
  );

  // global.socketio.emit('fetch_notifications');
  res.status(httpStatus.CREATED).send(issue);
});
const createReview = catchAsync(async (req, res) => {
  const issue = await Issue.findByIdAndUpdate(
    req.body.issueId,
    { review: { body: req.body.body, rating: req.body.rating } },
    { new: true, useFindAndModify: true }
  );
  // global.socketio.emit('fetch_notifications');
  res.status(httpStatus.CREATED).send(issue);
});

const getIssuesForEpic = catchAsync(async (req, res) => {
  const result = await issueService.getIssuesForEpic(req.params.epicId);
  res.send(result);
});

const getIssueById = catchAsync(async (req, res) => {
  const issue = await issueService.getIssueById(req.params.issueId);
  if (!issue) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Issue not found');
  }
  res.send(issue);
});

const updateIssueById = catchAsync(async (req, res) => {
  const oldIssue = await Issue.findById(req.params.issueId);
  const issue = await issueService.updateIssueById(req.params.issueId, req.body);
  const epic = await Epic.findById(issue.epicId);
  const project = await Project.findById(epic.projectId);
  const sender = await User.findById(getUserFromBearerToken(req));
  if (!sender._id.equals(oldIssue.assigneeId) && req.body.assigneeId) {
    await notificationService.createNotification({
      sender: sender._id,
      receiver: oldIssue.assigneeId,
      read: false,
      type: 'updated_issue',
      issue: issue._id,
      project: project._id,
      message: `${sender.name} unassigned ${issue.key} from you`,
    });
  }
  if (!sender._id.equals(oldIssue.reporterId) && req.body.reporterId) {
    await notificationService.createNotification({
      sender: sender._id,
      receiver: oldIssue.reporterId,
      read: false,
      type: 'updated_issue',
      issue: issue._id,
      project: project._id,
      message: `${sender.name} updated ${issue.key} that you're watching`,
    });
  }
  let receiver;

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
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < receiver.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await notificationService.createNotification({
      sender: sender._id,
      receiver: receiver[i],
      read: false,
      type: 'updated_issue',
      issue: issue._id,
      project: project._id,
      message:
        receiver[i] === issue.assigneeId && !sender._id.equals(issue.assigneeId) && req.body.assigneeId
          ? `${sender.name} assigned ${issue.key} to you`
          : `${sender.name} updated ${issue.key} that you're watching`,
    });
  }

  // global.socketio.emit('fetch_notifications');
  res.send(issue);
});

const deleteIssueById = catchAsync(async (req, res) => {
  const oldIssue = await Issue.findById(req.params.issueId);
  const epic = await Epic.findById(oldIssue.epicId);
  const project = await Project.findById(epic.projectId);
  await issueService.deleteIssueById(req.params.issueId);
  if (oldIssue) {
    const sender = await User.findById(getUserFromBearerToken(req));
    let receiver;
    receiver = [oldIssue.reporterId, oldIssue.assigneeId];
    if (sender._id.equals(oldIssue.assigneeId)) {
      receiver = [oldIssue.reporterId];
    }
    if (sender._id.equals(oldIssue.reporterId)) {
      receiver = [oldIssue.assigneeId];
    }
    if (oldIssue.reporterId.equals(oldIssue.reporterId)) {
      receiver = [oldIssue.assigneeId];
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < receiver.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await notificationService.createNotification({
        sender: sender._id,
        receiver: receiver[i],
        read: false,
        type: 'deleted_issue',
        project: project._id,
        message: `${oldIssue.key} was deleted by ${sender.name}`,
      });
    }
    // global.socketio.emit('fetch_notifications');
    res.status(httpStatus.NO_CONTENT).send();
  }
});

module.exports = {
  createIssue,
  getIssuesForEpic,
  getIssueById,
  updateIssueById,
  deleteIssueById,
  completeImageUpload,
  createReview,
};
