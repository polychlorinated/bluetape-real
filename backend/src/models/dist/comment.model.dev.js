"use strict";

var mongoose = require('mongoose');

var _require = require('./plugins'),
    toJSON = _require.toJSON,
    paginate = _require.paginate;

var commentSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
    trim: true
  },
  issueId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Issue',
    required: true
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  file: {
    type: String
  },
  creationDate: {
    type: Date,
    "default": Date.now()
  }
}, {
  timestamps: true
}); // add plugin that converts mongoose to json

commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);
var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;