const express = require('express');
const validate = require('../../middlewares/validate');
const { authValidation } = require('../../validations');
const { authController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', auth('checkAuth'), authController.authChecker);
router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot_password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset_password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/send-verification-email', authController.sendVerificationEmail);
router.get('/verify_account/:token', validate(authValidation.verifyEmail), authController.verifyEmail);

module.exports = router;
