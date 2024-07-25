const { Notification } = require('../models');

const readNotifications = async (notificationIds) => {
  return Notification.updateMany({ _id: { $in: notificationIds } }, { $set: { read: true } }, { multi: true });
};

const readAllNotifications = async (userId) => {
  return Notification.updateMany({ receiver: userId }, { $set: { read: true } }, { multi: true });
};

const getNotifications = async (userId) => {
  return Notification.find({ receiver: userId, read: false }).populate('sender').populate('issue').populate('project');
};

const createNotification = async (body) => {
  return Notification.create(body);
};

module.exports = {
  readNotifications,
  getNotifications,
  createNotification,
  readAllNotifications,
};
