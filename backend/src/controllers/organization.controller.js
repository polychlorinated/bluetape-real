const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { organizationService } = require('../services');
const { Organization, User, Invitation } = require('../models');
const { sendInvitationEmail } = require('../services/email.service');

const getOrganization = catchAsync(async (req, res) => {
  const organization = await organizationService.getOrganizationById(req.params.orgId);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  res.send(organization);
});
const inviteMember = catchAsync(async (req, res) => {
  const owner = req.body.id;

  const organization = await Organization.findOne({ owner });
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  res.send(organization);
});
const inviteMemb = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, 'Already a member!');
  }
  const owner = req.body.id;
  const organization = await Organization.findOne({ owner });
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong!');
  }

  user = await User.findOne({ email: req.email });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, 'User is a part of different organization!');
  }
  const invitation = await Invitation.create(req);
  // const project = await Project.findById(invitation.projectId);
  const org = await Organization.findById(invitation.orgId);

  try {
    await sendInvitationEmail(invitation.email, invitation.invitationCode, project.name, org.name, url);
  } catch (e) {
    throw new Error(e);
  }
  return invitation;
};

module.exports = {
  getOrganization,
};
