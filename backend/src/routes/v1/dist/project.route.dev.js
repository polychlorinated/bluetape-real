"use strict";

var express = require('express');

var auth = require('../../middlewares/auth');

var validate = require('../../middlewares/validate');

var _require = require('../../validations'),
    projectValidation = _require.projectValidation;

var _require2 = require('../../controllers'),
    projectController = _require2.projectController;

var generalController = require('../../controllers');

var router = express.Router();
router.route('/invite').post(auth('inviteMembers'), validate(projectValidation.inviteMember), projectController.inviteMemberToProject);
router.post('/postImage/:key', generalController.imageUpload, projectController.completeImageUpload);
router.route('/:id').get(auth('getProjects'), validate(projectValidation.getProjectsForUser), projectController.getProjectsForUser).post(auth('createProject'), validate(projectValidation.createProject), projectController.createProject);
router.route('/start_sprint/:projectId').post(auth('manageSprint'), validate(projectValidation.startSprint), projectController.startSprint);
router.route('/end_sprint/:projectId').get(auth('manageSprint'), validate(projectValidation.endSprint), projectController.endSprint);
router.route('/manage/:projectId').get(auth('getProjects'), projectController.getProjectById).put(auth('manageProjects'), validate(projectValidation.updateProject), projectController.updateProjectById)["delete"](auth('manageProjects'), validate(projectValidation.deleteProject), projectController.deleteProjectById);
module.exports = router;