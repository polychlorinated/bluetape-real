"use strict";

var httpStatus = require('http-status');

var ApiError = require('../utils/ApiError');

var catchAsync = require('../utils/catchAsync');

var _require = require('../services'),
    organizationService = _require.organizationService;

var _require2 = require('../models'),
    Organization = _require2.Organization,
    User = _require2.User,
    Invitation = _require2.Invitation;

var _require3 = require('../services/email.service'),
    sendInvitationEmail = _require3.sendInvitationEmail;

var getOrganization = catchAsync(function _callee(req, res) {
  var organization;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(organizationService.getOrganizationById(req.params.orgId));

        case 2:
          organization = _context.sent;

          if (organization) {
            _context.next = 5;
            break;
          }

          throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');

        case 5:
          res.send(organization);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
var inviteMember = catchAsync(function _callee2(req, res) {
  var owner, organization;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          owner = req.body.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Organization.findOne({
            owner: owner
          }));

        case 3:
          organization = _context2.sent;

          if (organization) {
            _context2.next = 6;
            break;
          }

          throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');

        case 6:
          res.send(organization);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});

var inviteMemb = function inviteMemb(req, res) {
  var user, owner, organization, invitation, org;
  return regeneratorRuntime.async(function inviteMemb$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          user = _context3.sent;

          if (!user) {
            _context3.next = 5;
            break;
          }

          throw new ApiError(httpStatus.CONFLICT, 'Already a member!');

        case 5:
          owner = req.body.id;
          _context3.next = 8;
          return regeneratorRuntime.awrap(Organization.findOne({
            owner: owner
          }));

        case 8:
          organization = _context3.sent;

          if (organization) {
            _context3.next = 11;
            break;
          }

          throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong!');

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.email
          }));

        case 13:
          user = _context3.sent;

          if (!user) {
            _context3.next = 16;
            break;
          }

          throw new ApiError(httpStatus.CONFLICT, 'User is a part of different organization!');

        case 16:
          _context3.next = 18;
          return regeneratorRuntime.awrap(Invitation.create(req));

        case 18:
          invitation = _context3.sent;
          _context3.next = 21;
          return regeneratorRuntime.awrap(Organization.findById(invitation.orgId));

        case 21:
          org = _context3.sent;
          _context3.prev = 22;
          _context3.next = 25;
          return regeneratorRuntime.awrap(sendInvitationEmail(invitation.email, invitation.invitationCode, project.name, org.name, url));

        case 25:
          _context3.next = 30;
          break;

        case 27:
          _context3.prev = 27;
          _context3.t0 = _context3["catch"](22);
          throw new Error(_context3.t0);

        case 30:
          return _context3.abrupt("return", invitation);

        case 31:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[22, 27]]);
};

module.exports = {
  getOrganization: getOrganization
};