const multer = require('multer');
const ApiError = require('../utils/ApiError');

module.exports.authController = require('./auth.controller');
module.exports.userController = require('./user.controller');
module.exports.organizationController = require('./organization.controller');
module.exports.projectController = require('./project.controller');
module.exports.epicController = require('./epic.controller');
module.exports.issueController = require('./issue.controller');
module.exports.commentController = require('./comment.controller');
module.exports.notificationController = require('./notification.controller');

const multerStorage = multer.diskStorage({
  destination: (req, file, callB) => {
    callB(null, './uploads/files');
  },
  filename: (req, file, callB) => {
    const ext = file.mimetype.split('/')[1];
    callB(
      null,
      `${req.params.key.split('*').join('.')}-${file.originalname.split('.')[0]}-${Date.now()}${
        file.mimetype.startsWith('video') ? 'video' : 'image'
      }.${ext}`
    );
  },
});

const multerFilter = (req, file, callB) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('application') || file.mimetype.startsWith('video')) {
    callB(null, true);
  } else {
    callB(new ApiError('File not supported', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.imageUpload = upload.single('file');
