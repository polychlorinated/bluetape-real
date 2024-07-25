"use strict";

var mongoose = require('mongoose');

var _require = require('./plugins'),
    toJSON = _require.toJSON,
    paginate = _require.paginate;

var issueSchema = mongoose.Schema({
  title: {
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
  location: {
    type: String
  },
  epicId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Epic',
    required: true
  },
  file: {
    type: String
  },
  status: {
    type: String,
    "enum": ['ready', 'blocked', 'inProgress', 'inQa', 'done', 'unplanned', 'planned', 'archived'],
    "default": 'unplanned'
  },
  previousSprintStatus: {
    type: String,
    "enum": ['ready', 'blocked', 'inProgress', 'inQa']
  },
  estimate: {
    type: Number
  },
  comments: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Comment'
  },
  timeSpent: {
    type: Number
  },
  review: {
    type: Object,
    "default": {}
  },
  timeRemaining: {
    type: Number
  },
  priority: {
    type: String,
    "enum": ['1', '2', '3', '4', '5'],
    "default": '5'
  },
  assigneeId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  reporterId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  assignee: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  reporter: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  deadline: {
    type: String
  },
  creationDate: {
    type: Date
  }
}, {
  timestamps: true
}); // add plugin that converts mongoose to json

issueSchema.plugin(toJSON);
issueSchema.plugin(paginate);
var Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;