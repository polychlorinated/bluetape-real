const httpStatus = require('http-status');
const { Project, Organization, Issue, Epic, Invitation, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { sendInvitationEmail } = require('./email.service');

const createProject = async (projectBody) => {
  if (await Project.isNameTaken(projectBody.name, projectBody.orgId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project name already taken');
  }
  return Project.create(projectBody);
};

const getProjectsForUser = async (id) => {
  const user = await User.findById(id);
  let query;
  if (user.role === 'owner') {
    query = {
      path: 'projects',
      populate: {
        path: 'projectLead',
        select: { name: 1 },
      },
    };
  } else {
    query = {
      path: 'projects',
      populate: {
        path: 'projectLead',
        select: { name: 1 },
      },
      match: { _id: { $in: user.projects } },
    };
  }
  return Organization.findById(user.orgId).populate('members').populate('owner').populate(query);
};

const getProjectById = async (id) => {
  try {
    const project = await Project.findById(id).populate('projectLead');
    const epics = await Epic.find({ projectId: id });
    const epicIds = epics.map((epic) => {
      return epic._id;
    });
    const issues = await Issue.find({ epicId: { $in: epicIds } });
    const users = await User.find({ projects: project._id });
    const result = {
      project: {
        ...project._doc,
        epics,
        issues,
        users,
      },
    };
    return result;
  } catch (e) {
    return e;
  }
};

const updateProjectById = async (projectId, updateBody) => {
  const project = await Project.findOneAndUpdate({ _id: projectId }, updateBody, { new: true, useFindAndModify: true });
  return project;
};

const deleteProjectById = async (projectId) => {
  const epics = await Epic.find({ projectId });
  const epicIds = epics.map((epic) => epic._id);
  await Issue.remove({ epicId: { $in: epicIds } });
  await Epic.remove({ projectId });
  await User.updateOne({ projects: projectId }, { $pull: { projects: projectId } });
  await Organization.updateOne({ projects: projectId }, { $pull: { projects: projectId } });
  await Invitation.remove({ projectId });
  await Project.remove({ _id: projectId });
};

const inviteMember = async (invitationBody, url) => {
  let user = await User.findOne({ email: invitationBody.email, projects: invitationBody.projectId });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, 'Already a member!');
  }
  if (invitationBody.type !== 'org') {
    user = await User.findOne({ email: invitationBody.email, orgId: invitationBody.orgId });
    if (user) {
      await User.findOneAndUpdate(
        { email: invitationBody.email, orgId: invitationBody.orgId },
        { $push: { projects: invitationBody.projectId } }
      );
      return;
    }
  }
  user = await User.findOne({ email: invitationBody.email });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, 'User is a part of different organization!');
  }

  const invitation = await Invitation.create(invitationBody);
  let project;
  if (invitationBody.type !== 'org') {
    project = await Project.findById(invitation.projectId);
    project = project.name;
  }
  const org = await Organization.findById(invitation.orgId);
  try {
    await sendInvitationEmail(invitation.email, invitation.invitationCode, project, org.name, url);
    // console.log('doing nothign');
  } catch (e) {
    throw new Error(e);
  }
  return invitation;
};

const startSprint = async (projectId, noOfWeeks) => {
  let timeInFuture = 1.21e9;
  if (noOfWeeks === 3) timeInFuture = 1.814e9;
  if (noOfWeeks === 4) timeInFuture = 2.419e9;
  const epicIds = (await Epic.find({ projectId }, { _id: 1 })).map((epic) => epic._id);
  await Issue.updateMany({ epicId: { $in: epicIds }, status: 'planned' }, { status: 'ready' });
  await Issue.updateMany(
    {
      epicId: { $in: epicIds },
      previousSprintStatus: { $in: ['ready', 'blocked', 'inProgress', 'inQa'] },
    },
    [{ $set: { status: '$previousSprintStatus', previousSprintStatus: null } }]
  );
  return Project.findByIdAndUpdate(
    projectId,
    {
      sprintStatus: 'active',
      sprintStartDate: Date.now(),
      sprintEndDate: Date.now() + timeInFuture,
      $inc: { sprintNumber: 1 },
    },
    { new: true }
  );
};

const endSprint = async (projectId) => {
  const epicIds = (await Epic.find({ projectId }, { _id: 1 })).map((epic) => epic._id);
  await Issue.updateMany({ epicId: { $in: epicIds }, status: 'done' }, { status: 'archived' });
  // await Issue.updateMany({ epicId: { $in: epicIds }, status: { $in: ['ready', 'blocked', 'inProgress', 'inQa'] } }, [
  //   { $set: { previousSprintStatus: '$status', status: 'planned' } },
  // ]);
  return Project.findByIdAndUpdate(
    projectId,
    {
      sprintStatus: 'inactive',
      sprintStartDate: null,
      SprintEndDate: null,
    },
    { new: true }
  );
};

module.exports = {
  createProject,
  getProjectsForUser,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  inviteMember,
  startSprint,
  endSprint,
};
