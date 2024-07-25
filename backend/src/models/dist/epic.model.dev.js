"use strict";

var mongoose = require('mongoose');

var _require = require('./plugins'),
    toJSON = _require.toJSON,
    paginate = _require.paginate;

var epicSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
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
  priority: {
    type: String,
    "enum": ['1', '2', '3', '4', '5'],
    "default": '5'
  },
  comments: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Comment'
  },
  projectId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Project',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  activityStatus: {
    type: String,
    "enum": ['backlog', 'active'],
    "default": 'backlog'
  },
  totalIssues: {
    type: Number,
    "default": 0
  },
  creationDate: {
    type: Date
  }
}, {
  timestamps: true
}); // add plugin that converts mongoose to json

epicSchema.plugin(toJSON);
epicSchema.plugin(paginate);
var Epic = mongoose.model('Epic', epicSchema);
module.exports = Epic;