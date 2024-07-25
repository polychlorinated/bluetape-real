const Joi = require('joi');
const { objectId } = require('./custom.validation');

const readNotifications = {
  params: Joi.object().keys({
    notificationId: Joi.required().custom(objectId),
  }),
};

const readAllNotifications = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
};

const getNotifications = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  readNotifications,
  getNotifications,
  readAllNotifications,
};
