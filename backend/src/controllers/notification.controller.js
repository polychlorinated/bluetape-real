const httpStatus = require('http-status');
const { notificationService } = require('../services');
const ApiError = require('../utils/ApiError');
const getUserFromBearerToken = require('../utils/getBearerToken');

const readNotifications = async (req, res) => {
  try {
    const a = await notificationService.readNotifications(req.params.notificationId);
    global.socketio.emit('fetch_notifications');
    res.send(httpStatus.OK);
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const readAllNotifications = async (req, res) => {
  try {
    await notificationService.readAllNotifications(req.params.userId);
    // global.socketio.emit('fetch_notifications');
    res.send(httpStatus.OK);
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications(getUserFromBearerToken(req));
    res.status(httpStatus.OK).send(notifications);
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
  }
};

module.exports = {
  readNotifications,
  getNotifications,
  readAllNotifications,
};
