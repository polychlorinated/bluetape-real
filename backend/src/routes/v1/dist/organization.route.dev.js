"use strict";

var express = require('express');

var auth = require('../../middlewares/auth');

var _require = require('../../controllers'),
    organizationController = _require.organizationController;

var router = express.Router();
router.route('/:orgId').get(auth('getOrganization'), organizationController.getOrganization);
router.post('/invite', organizationController.getOrganization);
module.exports = router;