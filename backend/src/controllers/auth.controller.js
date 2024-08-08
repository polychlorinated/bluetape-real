const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, organizationService } = require('../services');
const { Invitation, User, Organization, Project } = require('../models');

const register = catchAsync(async (req, res) => {
  console.log('Registration attempt:', req.body);
  let user;
  try {
    const org = await organizationService.orgExists(req.body.organization);
    let invitation;
    if (req.body.role === 'member') {
      if (!org) {
        throw new Error('Organization not found!');
      }
      invitation = await Invitation.findOne({
        invitationCode: req.body.invitationCode,
        email: req.body.email,
        orgId: org._id,
      });
      if (!invitation) {
        throw new Error('Invalid invite code!');
      }
    }

    if (req.body.role === 'member' && invitation.type !== 'org') {
      if (!org) {
        throw new Error('Organization not found!');
      }

      if (!invitation) {
        throw new Error('Invalid invite code!');
      }
      req.body.orgId = org._id;
      user = await userService.createUser({ ...req.body, isEmailVerified: true });
      user = await User.findOneAndUpdate({ _id: user._id }, { $push: { projects: invitation.projectId } });
      await organizationService.addMemberToOrgByID({ orgId: org._id, member: user._id });
      await Invitation.remove({ _id: invitation._id });
    } else if (req.body.role === 'owner' || (invitation && invitation.type === 'org')) {
      const type = invitation ? invitation.type : undefined;
      if (org && type !== 'org') {
        throw new Error('Organization already exists!');
      }

      if (req.body.role === 'owner' && type !== 'org') {
        user = await userService.createUser(req.body);
        const newOrg = await organizationService.createOrganization({ name: req.body.organization, owner: user._id });
        user = await userService.updateUserById(user._id, { orgId: newOrg._id });
      } else {
        user = await userService.createUser({ ...req.body, role: 'owner', isHalfOwner: true });
        await User.findByIdAndUpdate(user._id, { projects: org.projects });
        user = await userService.updateUserById(user._id, { orgId: org._id });
        await organizationService.addMemberToOrgByID({ orgId: org._id, member: user._id });
        await Invitation.remove({ _id: invitation._id });

        org.projects.forEach(async (pro) => {
          await Project.findByIdAndUpdate(pro._id, { $push: { members: user._id } });
        });
      }
    }
    const tokens = await tokenService.generateAuthTokens(user);
    console.log('User registered successfully:', user.email);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (e) {
    console.error('Registration error:', e.message);
    res.status(httpStatus.BAD_REQUEST).send({ message: e.message });
  }
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.signInUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const signOut = catchAsync(async (req, res) => {
  await authService.signOut(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const newPassword = generatePassword();
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(httpStatus.BAD_REQUEST).send('User does not exist!');
    return;
  }
  Object.assign(user, { password: newPassword });

  await user.save();

  await emailService.sendResetPasswordEmail(req.body.email, newPassword);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);

  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.params.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const authChecker = catchAsync(async (req, res) => {
  try {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    res.send({ user: req.user });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'An error occurred during authentication check' });
  }
});

function generatePassword() {
  var length = 16,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

module.exports = {
  register,
  signIn,
  signOut,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  authChecker,
};