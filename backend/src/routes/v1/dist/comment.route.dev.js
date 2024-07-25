"use strict";

var express = require('express');

var auth = require('../../middlewares/auth');

var validate = require('../../middlewares/validate');

var _require = require('../../validations'),
    commentValidation = _require.commentValidation;

var _require2 = require('../../controllers'),
    commentController = _require2.commentController;

var generalController = require('../../controllers');

var router = express.Router();
router.route('/').post(auth('createComment'), validate(commentValidation.createComment), commentController.createComment);
router.post('/postImage/:key', generalController.imageUpload, commentController.completeImageUpload);
router.route('/:commentId').put(auth('manageComments'), validate(commentValidation.updateComment), commentController.updateComment)["delete"](auth('manageComments'), validate(commentValidation.deleteComment), commentController.deleteComment);
module.exports = router;