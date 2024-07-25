const express = require('express');
const auth = require('../../middlewares/auth');
const { organizationController } = require('../../controllers');

const router = express.Router();

router.route('/:orgId').get(auth('getOrganization'), organizationController.getOrganization);
router.post('/invite', organizationController.getOrganization);

module.exports = router;
