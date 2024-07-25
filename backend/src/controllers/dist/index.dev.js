"use strict";

var multer = require('multer');

var ApiError = require('../utils/ApiError');

module.exports.authController = require('./auth.controller');
module.exports.userController = require('./user.controller');
module.exports.organizationController = require('./organization.controller');
module.exports.projectController = require('./project.controller');
module.exports.epicController = require('./epic.controller');
module.exports.issueController = require('./issue.controller');
module.exports.commentController = require('./comment.controller');
module.exports.notificationController = require('./notification.controller');
var multerStorage = multer.diskStorage({
  destination: function destination(req, file, callB) {
    callB(null, './uploads/files');
  },
  filename: function filename(req, file, callB) {
    var ext = file.mimetype.split('/')[1];
    callB(null, "".concat(req.params.key.split('*').join('.'), "-").concat(file.originalname.split('.')[0], "-").concat(Date.now()).concat(file.mimetype.startsWith('video') ? 'video' : 'image', ".").concat(ext));
  }
});

var multerFilter = function multerFilter(req, file, callB) {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('application') || file.mimetype.startsWith('video')) {
    callB(null, true);
  } else {
    callB(new ApiError('File not supported', 400), false);
  }
};

var upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.imageUpload = upload.single('file');