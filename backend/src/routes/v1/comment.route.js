const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { commentValidation } = require('../../validations');
const { commentController } = require('../../controllers');
const generalController = require('../../controllers');

const router = express.Router();

router.route('/').post(auth('createComment'), validate(commentValidation.createComment), commentController.createComment);
router.post('/postImage/:key', generalController.imageUpload, commentController.completeImageUpload);

router
  .route('/:commentId')
  .put(auth('manageComments'), validate(commentValidation.updateComment), commentController.updateComment)
  .delete(auth('manageComments'), validate(commentValidation.deleteComment), commentController.deleteComment);

module.exports = router;
