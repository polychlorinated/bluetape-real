const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const NotificationSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    read: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      enum: [
        'added_comment',
        'updated_comment',
        'updated_issue',
        'deleted_issue',
        'assigned_issue',
        'unassigned_issue',
        'started_sprint',
        'ended_sprint',
      ],
    },
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    epic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Epic',
    },
  },
  {
    timestamps: true,
  }
);

NotificationSchema.plugin(toJSON);
NotificationSchema.plugin(paginate);

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
