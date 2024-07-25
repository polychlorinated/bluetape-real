const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { issueValidation } = require('../../validations');
const { issueController } = require('../../controllers');
const generalController = require('../../controllers');

const router = express.Router();
router.post(
  '/postImage/:key',

  generalController.imageUpload,
  issueController.completeImageUpload
);

router.route('/').post(auth('createIssue'), validate(issueValidation.createIssue), issueController.createIssue);
router.post('/createReview', issueController.createReview);

router
  .route('/:issueId')
  .get(auth('getIssues'), issueController.getIssueById)
  .put(auth('manageIssues'), validate(issueValidation.updateIssue), issueController.updateIssueById)
  .delete(auth('manageIssues'), validate(issueValidation.deleteIssue), issueController.deleteIssueById);

module.exports = router;
