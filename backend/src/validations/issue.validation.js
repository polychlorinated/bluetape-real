const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createIssue = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    key: Joi.string().required(),
    review: Joi.object(),
    location: Joi.string(),
    status: Joi.string().required(),
    epicId: Joi.required().custom(objectId),
    estimate: Joi.string().allow(null, ''),
    assigneeId: Joi.custom(objectId),
    assignee: Joi.custom(objectId),
    reporterId: Joi.required().custom(objectId),
    reporter: Joi.required().custom(objectId),
    priority: Joi.string().required(),
    description: Joi.string().allow(''),
    creationDate: Joi.date(),
    ratings: Joi.number(),
    deadline: Joi.string(),
  }),
};

const updateIssue = {
  params: Joi.object().keys({
    issueId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      file: Joi.any(),
      review: Joi.object(),
      location: Joi.string(),
      deadline: Joi.string(),
      status: Joi.string(),
      priority: Joi.string(),
      timeSpent: Joi.number(),
      timeRemaining: Joi.number(),
      description: Joi.string(),
      assigneeId: Joi.custom(objectId).allow(null),
      assignee: Joi.custom(objectId).allow(null),
      reporterId: Joi.custom(objectId).allow(null),
      reporter: Joi.custom(objectId).allow(null),
      inProgressSince: Joi.date(),
      estimate: Joi.number(),
    })
    .min(1),
};

const deleteIssue = {
  params: Joi.object().keys({
    issueId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createIssue,
  updateIssue,
  deleteIssue,
};
