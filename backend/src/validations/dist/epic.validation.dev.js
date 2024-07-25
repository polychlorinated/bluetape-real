"use strict";

var Joi = require('joi');

var _require = require('./custom.validation'),
    objectId = _require.objectId;

var createEpic = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    key: Joi.string().required(),
    projectId: Joi.required().custom(objectId),
    priority: Joi.string().required(),
    description: Joi.string().allow(''),
    creationDate: Joi.date(),
    location: Joi.string()
  })
};
var updateEpic = {
  params: Joi.object().keys({
    epicId: Joi.required().custom(objectId)
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    location: Joi.string(),
    priority: Joi.string(),
    description: Joi.string()
  }).min(1)
};
var getEpicsForProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId)
  })
};
var deleteEpic = {
  params: Joi.object().keys({
    epicId: Joi.string().custom(objectId)
  })
};
module.exports = {
  createEpic: createEpic,
  updateEpic: updateEpic,
  getEpicsForProject: getEpicsForProject,
  deleteEpic: deleteEpic
};