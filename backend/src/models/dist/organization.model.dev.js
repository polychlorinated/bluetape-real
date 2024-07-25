"use strict";

var mongoose = require('mongoose');

var _require = require('./plugins'),
    toJSON = _require.toJSON,
    paginate = _require.paginate;

var orgSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  projects: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Project',
    required: true
  },
  members: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User'
  },
  memebersAllProjects: {
    type: Array,
    "default": []
  }
}, {
  timestamps: true
}); // add plugin that converts mongoose to json

orgSchema.plugin(toJSON);
orgSchema.plugin(paginate);

orgSchema.statics.isOrganizationNameTaken = function _callee(name) {
  var organization;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(this.findOne({
            name: name
          }));

        case 2:
          organization = _context.sent;
          return _context.abrupt("return", !!organization);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

var Organization = mongoose.model('Organization', orgSchema);
module.exports = Organization;