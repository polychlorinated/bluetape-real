const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { projectValidation } = require('../../validations');
const { projectController } = require('../../controllers');
const generalController = require('../../controllers');

const router = express.Router();

router
  .route('/invite')
  .post(auth('inviteMembers'), validate(projectValidation.inviteMember), projectController.inviteMemberToProject);

router.post('/postImage/:key', generalController.imageUpload, projectController.completeImageUpload);

router
  .route('/:id')
  .get(auth('getProjects'), validate(projectValidation.getProjectsForUser), projectController.getProjectsForUser)
  .post(auth('createProject'), validate(projectValidation.createProject), projectController.createProject);

router
  .route('/start_sprint/:projectId')
  .post(auth('manageSprint'), validate(projectValidation.startSprint), projectController.startSprint);

router
  .route('/end_sprint/:projectId')
  .get(auth('manageSprint'), validate(projectValidation.endSprint), projectController.endSprint);

router
  .route('/manage/:projectId')
  .get(auth('getProjects'), projectController.getProjectById)
  .put(auth('manageProjects'), validate(projectValidation.updateProject), projectController.updateProjectById)
  .delete(auth('manageProjects'), validate(projectValidation.deleteProject), projectController.deleteProjectById);

module.exports = router;
