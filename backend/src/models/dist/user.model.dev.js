"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var _require = require('./plugins'),
    toJSON = _require.toJSON,
    paginate = _require.paginate;

var _require2 = require('../config/roles'),
    roles = _require2.roles;

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatarUrl: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate: function validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
    "private": true // used by the toJSON plugin

  },
  projects: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Project'
  },
  orgId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Organization'
  },
  role: {
    type: String,
    "enum": roles,
    "default": 'member'
  },
  isHalfOwner: {
    type: Boolean,
    "default": false
  },
  isEmailVerified: {
    type: Boolean,
    "default": true
  },
  profile: {
    type: String
  },
  creationDate: {
    type: Date
  }
}, {
  timestamps: true
}); // add plugin that converts mongoose to json

userSchema.plugin(toJSON);
userSchema.plugin(paginate);
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

userSchema.statics.isEmailTaken = function _callee(email, excludeUserId) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(this.findOne({
            email: email,
            _id: {
              $ne: excludeUserId
            }
          }));

        case 2:
          user = _context.sent;
          return _context.abrupt("return", !!user);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};
/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */


userSchema.methods.isPasswordMatch = function _callee2(password) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this;
          return _context2.abrupt("return", bcrypt.compare(password, user.password));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

userSchema.pre('save', function _callee3(next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = this;

          if (!user.isModified('password')) {
            _context3.next = 5;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 4:
          user.password = _context3.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
});
/**
 * @typedef User
 */

var User = mongoose.model('User', userSchema);
module.exports = User;