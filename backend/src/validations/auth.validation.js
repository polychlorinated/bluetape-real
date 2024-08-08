const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().custom(password),
    organization: Joi.string().trim().required(),
    role: Joi.string().trim().required().valid('member', 'owner'),
    name: Joi.string().trim().required(),
    invitationCode: Joi.string().length(6).when('role', {
      is: 'member',
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),
    creationDate: Joi.date().default(Date.now),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    token: Joi.string().required(),
  }),
};

const verifyEmail = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};