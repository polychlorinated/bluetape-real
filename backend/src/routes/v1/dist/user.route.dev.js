"use strict";

var express = require('express');

var auth = require('../../middlewares/auth');

var validate = require('../../middlewares/validate');

var _require = require('../../validations'),
    userValidation = _require.userValidation;

var _require2 = require('../../controllers'),
    userController = _require2.userController;

var generalController = require('../../controllers');

var router = express.Router(); // router.post('postImage/:key', generalController.imageUpload, userController.completeImageUpload);

router.post('/postImage/:key', generalController.imageUpload, userController.completeImageUpload);
router.route('/').post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser).get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);
router.route('/:userId').get(auth('getUsers'), validate(userValidation.getUser), userController.getUser).put(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)["delete"](auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);
module.exports = router;