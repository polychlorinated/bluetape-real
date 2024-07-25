const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const invitationSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
    orgId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    invitationCode: {
      type: String,
      minlength: 6,
      maxLength: 6,
      required: true,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
invitationSchema.plugin(toJSON);
invitationSchema.plugin(paginate);

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
