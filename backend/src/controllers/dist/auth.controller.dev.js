"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var httpStatus = require('http-status');

var catchAsync = require('../utils/catchAsync');

var _require = require('../services'),
    authService = _require.authService,
    userService = _require.userService,
    tokenService = _require.tokenService,
    emailService = _require.emailService,
    organizationService = _require.organizationService;

var _require2 = require('../models'),
    Invitation = _require2.Invitation,
    User = _require2.User,
    Organization = _require2.Organization,
    Project = _require2.Project;

var register = catchAsync(function _callee2(req, res) {
  var user, org, invitation, type, newOrg;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(organizationService.orgExists(req.body.organization));

        case 3:
          org = _context2.sent;

          if (!(req.body.role === 'member')) {
            _context2.next = 14;
            break;
          }

          if (org) {
            _context2.next = 8;
            break;
          }

          res.status(httpStatus.NOT_FOUND).send('Organization not found!');
          return _context2.abrupt("return");

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Invitation.findOne({
            invitationCode: req.body.invitationCode,
            email: req.body.email,
            orgId: org._id
          }));

        case 10:
          invitation = _context2.sent;

          if (invitation) {
            _context2.next = 14;
            break;
          }

          res.status(httpStatus.NOT_FOUND).send('Invalid invite code!');
          return _context2.abrupt("return");

        case 14:
          if (!(req.body.role === 'member' && invitation.type !== 'org')) {
            _context2.next = 34;
            break;
          }

          if (org) {
            _context2.next = 18;
            break;
          }

          res.status(httpStatus.NOT_FOUND).send('Organization not found!');
          return _context2.abrupt("return");

        case 18:
          if (invitation) {
            _context2.next = 21;
            break;
          }

          res.status(httpStatus.NOT_FOUND).send('Invalid invite code!');
          return _context2.abrupt("return");

        case 21:
          req.body.orgId = org._id;
          _context2.next = 24;
          return regeneratorRuntime.awrap(userService.createUser(_objectSpread({}, req.body, {
            isEmailVerified: true
          })));

        case 24:
          user = _context2.sent;
          _context2.next = 27;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: user._id
          }, {
            $push: {
              projects: invitation.projectId
            }
          }));

        case 27:
          user = _context2.sent;
          _context2.next = 30;
          return regeneratorRuntime.awrap(organizationService.addMemberToOrgByID({
            orgId: org._id,
            member: user._id
          }));

        case 30:
          _context2.next = 32;
          return regeneratorRuntime.awrap(Invitation.remove({
            _id: invitation._id
          }));

        case 32:
          _context2.next = 64;
          break;

        case 34:
          if (!(req.body.role === 'owner' || invitation && invitation.type === 'org')) {
            _context2.next = 64;
            break;
          }

          type = invitation ? invitation.type : undefined;

          if (!(org && type !== 'org')) {
            _context2.next = 39;
            break;
          }

          res.status(httpStatus.BAD_REQUEST).send('Organization already exists!'); // Error handling

          return _context2.abrupt("return");

        case 39:
          if (!(req.body.role === 'owner' && type !== 'org')) {
            _context2.next = 51;
            break;
          }

          _context2.next = 42;
          return regeneratorRuntime.awrap(userService.createUser(req.body));

        case 42:
          user = _context2.sent;
          _context2.next = 45;
          return regeneratorRuntime.awrap(organizationService.createOrganization({
            name: req.body.organization,
            owner: user._id
          }));

        case 45:
          newOrg = _context2.sent;
          _context2.next = 48;
          return regeneratorRuntime.awrap(userService.updateUserById(user._id, {
            orgId: newOrg._id
          }));

        case 48:
          user = _context2.sent;
          _context2.next = 64;
          break;

        case 51:
          _context2.next = 53;
          return regeneratorRuntime.awrap(userService.createUser(_objectSpread({}, req.body, {
            role: 'owner',
            isHalfOwner: true
          })));

        case 53:
          user = _context2.sent;
          _context2.next = 56;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(user._id, {
            projects: org.projects
          }));

        case 56:
          _context2.next = 58;
          return regeneratorRuntime.awrap(userService.updateUserById(user._id, {
            orgId: org._id
          }));

        case 58:
          user = _context2.sent;
          _context2.next = 61;
          return regeneratorRuntime.awrap(organizationService.addMemberToOrgByID({
            orgId: org._id,
            member: user._id
          }));

        case 61:
          _context2.next = 63;
          return regeneratorRuntime.awrap(Invitation.remove({
            _id: invitation._id
          }));

        case 63:
          org.projects.forEach(function _callee(pro) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(Project.findByIdAndUpdate(pro._id, {
                      $push: {
                        members: user._id
                      }
                    }));

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 64:
          res.status(httpStatus.CREATED).send({
            user: user
          });
          _context2.next = 70;
          break;

        case 67:
          _context2.prev = 67;
          _context2.t0 = _context2["catch"](0);
          res.status(_context2.t0.statusCode).send(_context2.t0.message);

        case 70:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 67]]);
});
var login = catchAsync(function _callee3(req, res) {
  var _req$body, email, password, user, tokens;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context3.next = 3;
          return regeneratorRuntime.awrap(authService.loginUserWithEmailAndPassword(email, password));

        case 3:
          user = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(tokenService.generateAuthTokens(user));

        case 6:
          tokens = _context3.sent;
          res.send({
            user: user,
            tokens: tokens
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var logout = catchAsync(function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(authService.logout(req.body.refreshToken));

        case 2:
          res.status(httpStatus.NO_CONTENT).send();

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var refreshTokens = catchAsync(function _callee5(req, res) {
  var tokens;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(authService.refreshAuth(req.body.refreshToken));

        case 2:
          tokens = _context5.sent;
          res.send(_objectSpread({}, tokens));

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});

function generatePassword() {
  var length = 16,
      charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = '';

  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }

  return retVal;
}

var forgotPassword = catchAsync(function _callee6(req, res) {
  var newPassword, user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          // const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
          newPassword = generatePassword();
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 3:
          user = _context6.sent;

          if (user) {
            _context6.next = 7;
            break;
          }

          res.status(httpStatus.BAD_REQUEST).send('User does not exist!');
          return _context6.abrupt("return");

        case 7:
          Object.assign(user, {
            password: newPassword
          });
          _context6.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          _context6.next = 12;
          return regeneratorRuntime.awrap(emailService.sendResetPasswordEmail(req.body.email, newPassword));

        case 12:
          res.status(httpStatus.NO_CONTENT).send();

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  });
});
var resetPassword = catchAsync(function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(authService.resetPassword(req.body.token, req.body.password));

        case 2:
          res.status(httpStatus.NO_CONTENT).send();

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
});
var sendVerificationEmail = catchAsync(function _callee8(req, res) {
  var verifyEmailToken;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(tokenService.generateVerifyEmailToken(req.user));

        case 2:
          verifyEmailToken = _context8.sent;
          _context8.next = 5;
          return regeneratorRuntime.awrap(emailService.sendVerificationEmail(req.user.email, verifyEmailToken));

        case 5:
          res.status(httpStatus.NO_CONTENT).send();

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
});
var verifyEmail = catchAsync(function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(authService.verifyEmail(req.params.token));

        case 2:
          res.status(httpStatus.NO_CONTENT).send();

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
});
var authChecker = catchAsync(function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          res.send({
            user: req.user
          });

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
});
module.exports = {
  register: register,
  login: login,
  logout: logout,
  refreshTokens: refreshTokens,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  sendVerificationEmail: sendVerificationEmail,
  verifyEmail: verifyEmail,
  authChecker: authChecker
};