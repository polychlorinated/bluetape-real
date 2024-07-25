const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const { projectService, notificationService } = require('../services');
const { addProjectToOrgById } = require('../services/organization.service');
const ApiError = require('../utils/ApiError');
const { User, Project, Notification, Organization } = require('../models');
const getUserFromBearerToken = require('../utils/getBearerToken');
const { epicService } = require('../services');
const hardEpics = require('./epicData.json');

const createProject = catchAsync(async (req, res) => {
  try {
    const owners = await User.find({ role: 'owner', orgId: req.params.id });
    const halfOwners = await User.find({ role: 'owner', orgId: req.params.id, isHalfOwner: true });
    const project = await projectService.createProject(req.body);

    halfOwners.forEach(async (hOwner) => {
      await Project.findByIdAndUpdate(project._id, { $push: { members: hOwner._id } });
    });

    owners.forEach(async (owner) => {
      if (!owner._id.equals(project.projectLead)) {
        await User.findOneAndUpdate({ role: 'owner', orgId: req.params.id }, { $push: { projects: project._id } });
      }
    });

    await User.findOneAndUpdate({ _id: project.projectLead }, { $push: { projects: project._id } });

    await addProjectToOrgById({
      orgId: req.params.id,
      project: project._id,
    });
    let epic;
    hardEpics.forEach(async (epi) => {
      let ep = epi;
      ep = { ...ep, projectId: project._id, key: `${project.name.split(' ').join('-').toUpperCase()}-${ep.key}` };

      epic = await epicService.createEpic(ep);
      await Project.findOneAndUpdate({ _id: epic.projectId }, { $inc: { totalEpics: 1 } });
      if (!epic) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Epic not found');
      }
    });

    res.status(httpStatus.CREATED).send(project);
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`${e.message}!`);
  }
});
///Check if file exists
const fileExists = async (path) => !!(await fs.promises.stat(path).catch((e) => false));

const completeImageUpload = catchAsync(async (req, res, next) => {
  const issueC = await Project.findOne({ key: req.params.key });
  const { file } = issueC;
  if (file) {
    const fileName = file;
    const fileCheck = await fileExists(path.join(`${__dirname}/../../uploads/files`, fileName));
    if (fileCheck) {
      fs.unlink(path.join(`${__dirname}/../../uploads/files`, fileName), (err) => {
        if (err) {
          next(new ApiError('Failed to delete flie', 404));
        }
        return;
      });
    }
  }
  const issue = await Project.findOneAndUpdate(
    { key: req.params.key },
    { file: req.file.filename },
    { new: true, useFindAndModify: true }
  );

  // global.socketio.emit('fetch_notifications');
  res.status(httpStatus.CREATED).send(issue);
});

const getProjectsForUser = catchAsync(async (req, res) => {
  const result = await projectService.getProjectsForUser(req.params.id);
  // global.socketio.emit('fetch_notifications');
  res.send(result);
});

const getProjectById = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(project);
});

const inviteMemberToProject = catchAsync(async (req, res) => {
  const resetURL = `${req.protocol}://${req.get('host')}`;
  const invitation = await projectService.inviteMember(req.body, resetURL);
  res.send(invitation);
});

const updateProjectById = catchAsync(async (req, res) => {
  const project = await projectService.updateProjectById(req.params.projectId, req.body);
  res.send(project);
});

const deleteProjectById = catchAsync(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.projectId);
  const notification = await Notification.deleteMany({ project: project._id });

  const { file } = project;
  if (file) {
    const fileName = file;
    const fileCheck = await fileExists(path.join(`${__dirname}/../../uploads/files`, fileName));
    if (fileCheck) {
      fs.unlink(path.join(`${__dirname}/../../uploads/files`, fileName), (err) => {
        if (err) {
          return new ApiError('Failed to delete flie', 404);
        }
      });
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});

const startSprint = catchAsync(async (req, res) => {
  const project = await projectService.startSprint(req.params.projectId, req.body.noOfWeeks);
  const sender = await User.findById(getUserFromBearerToken(req));
  const projectMembers = await User.find({ projects: project._id });
  const receiver = projectMembers.map((member) => member._id).filter((userId) => !userId.equals(sender._id));
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < receiver.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await notificationService.createNotification({
      sender: sender._id,
      receiver: receiver[i],
      read: false,
      type: 'started_sprint',
      project: project._id,
      message: `Sprint for project ${project.name} has been started by ${sender.name}`,
    });
  }
  // global.socketio.emit('fetch_notifications');
  res.sendStatus(200);
});

const endSprint = catchAsync(async (req, res) => {
  const project = await projectService.endSprint(req.params.projectId);
  const sender = await User.findById(getUserFromBearerToken(req));
  const projectMembers = await User.find({ projects: project._id });
  const receiver = projectMembers.map((member) => member._id).filter((userId) => !userId.equals(sender._id));
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < receiver.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await notificationService.createNotification({
      sender: sender._id,
      receiver: receiver[i],
      read: false,
      type: 'ended_sprint',
      project: project._id,
      message: `Sprint for project ${project.name} has been ended by ${sender.name}`,
    });
  }
  // global.socketio.emit('fetch_notifications');
  res.sendStatus(200);
});

module.exports = {
  createProject,
  getProjectsForUser,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  inviteMemberToProject,
  startSprint,
  endSprint,
  completeImageUpload,
};
