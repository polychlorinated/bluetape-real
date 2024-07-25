"use strict";

var mongoose = require('mongoose');

var _require = require('./plugins'),
    toJSON = _require.toJSON,
    paginate = _require.paginate;

var projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  totalEpics: {
    type: Number,
    "default": 0
  },
  sprintStatus: {
    type: String,
    "enum": ['active', 'inactive'],
    "default": 'inactive',
    trim: true
  },
  members: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User'
  },
  projectLead: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  totalIssues: {
    type: Number,
    "default": 0
  },
  file: {
    type: String
  },
  location: {
    longitude: String,
    latitude: String,
    isRandom: Boolean
  },
  creationDate: {
    type: Date,
    "default": Date.now()
  }
}, {
  timestamps: true
}); // add plugin that converts mongoose to json

projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

projectSchema.statics.isNameTaken = function _callee(name, orgId) {
  var project;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(this.findOne({
            name: name,
            organizationId: orgId
          }));

        case 2:
          project = _context.sent;
          return _context.abrupt("return", !!project);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

var Project = mongoose.model('Project', projectSchema);
module.exports = Project;