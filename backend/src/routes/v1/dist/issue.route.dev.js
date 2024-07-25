"use strict";

var express = require('express');

var auth = require('../../middlewares/auth');

var validate = require('../../middlewares/validate');

var _require = require('../../validations'),
    issueValidation = _require.issueValidation;

var _require2 = require('../../controllers'),
    issueController = _require2.issueController;

var generalController = require('../../controllers');

var router = express.Router();
router.post('/postImage/:key', generalController.imageUpload, issueController.completeImageUpload);
router.route('/').post(auth('createIssue'), validate(issueValidation.createIssue), issueController.createIssue);
router.post('/createReview', issueController.createReview);
router.route('/:issueId').get(auth('getIssues'), issueController.getIssueById).put(auth('manageIssues'), validate(issueValidation.updateIssue), issueController.updateIssueById)["delete"](auth('manageIssues'), validate(issueValidation.deleteIssue), issueController.deleteIssueById);
module.exports = router;