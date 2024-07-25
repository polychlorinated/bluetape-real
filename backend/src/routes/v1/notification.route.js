const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { notificationValidation } = require('../../validations');
const { notificationController } = require('../../controllers');

const router = express.Router();

router.get(
  '/read/:notificationId',
  auth('readNotifications'),
  validate(notificationValidation.readNotifications),
  notificationController.readNotifications
);

router.get(
  '/read_all/:userId',
  auth('readNotifications'),
  validate(notificationValidation.readAllNotifications),
  notificationController.readAllNotifications
);

router.get(
  '/get/:token',
  auth('getNotifications'),
  validate(notificationValidation.getNotifications),
  notificationController.getNotifications
);

module.exports = router;
