const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEpic = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    key: Joi.string().required(),
    projectId: Joi.required().custom(objectId),
    priority: Joi.string().required(),
    description: Joi.string().allow(''),
    creationDate: Joi.date(),
    location: Joi.string(),
  }),
};

const updateEpic = {
  params: Joi.object().keys({
    epicId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      location: Joi.string(),

      priority: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const getEpicsForProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId),
  }),
};

const deleteEpic = {
  params: Joi.object().keys({
    epicId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEpic,
  updateEpic,
  getEpicsForProject,
  deleteEpic,
};
