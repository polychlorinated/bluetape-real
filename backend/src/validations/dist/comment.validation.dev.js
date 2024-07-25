"use strict";

var Joi = require('joi');

var _require = require('./custom.validation'),
    objectId = _require.objectId;

var createComment = {
  body: Joi.object().keys({
    body: Joi.string().required(),
    issueId: Joi.required().custom(objectId),
    userId: Joi.required().custom(objectId),
    user: Joi.custom(objectId)
  })
};
var updateComment = {
  params: Joi.object().keys({
    commentId: Joi.required().custom(objectId)
  }),
  body: Joi.object().keys({
    body: Joi.string().required()
  }).min(1)
};
var deleteComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId)
  })
};
module.exports = {
  createComment: createComment,
  updateComment: updateComment,
  deleteComment: deleteComment
};