"use strict";

var Joi = require('joi');

var _require = require('./custom.validation'),
    objectId = _require.objectId;

var createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    location: Joi.object({
      longitude: Joi.string(),
      latitude: Joi.string(),
      isRandom: Joi["boolean"]()
    }),
    type: Joi.string(),
    key: Joi.string().required(),
    description: Joi.string().required(),
    projectLead: Joi.required()
  })
};
var updateProject = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId)
  }),
  body: Joi.object().keys({
    type: Joi.string(),
    name: Joi.string(),
    location: Joi.object({
      longitude: Joi.string(),
      latitude: Joi.string(),
      isRandom: Joi["boolean"]()
    }),
    description: Joi.string().allow(''),
    projectLead: Joi.custom(objectId)
  })
};
var getProjectsForUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  })
};
var deleteProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId).required()
  })
};
var startSprint = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId).required()
  }),
  body: Joi.object().keys({
    noOfWeeks: Joi.number().required()
  })
};
var endSprint = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId).required()
  })
};
var inviteMember = {
  body: Joi.object().keys({
    type: Joi.string(),
    email: Joi.string().email().required(),
    projectId: Joi.string().custom(objectId),
    orgId: Joi.string().custom(objectId),
    invitationCode: Joi.string().length(6).required()
  })
};
module.exports = {
  createProject: createProject,
  updateProject: updateProject,
  getProjectsForUser: getProjectsForUser,
  deleteProject: deleteProject,
  inviteMember: inviteMember,
  startSprint: startSprint,
  endSprint: endSprint
};