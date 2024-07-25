const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    totalEpics: {
      type: Number,
      default: 0,
    },
    sprintStatus: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
      trim: true,
    },

    members: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'User',
    },
    projectLead: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    totalIssues: {
      type: Number,
      default: 0,
    },
    file: {
      type: String,
    },
    location: {
      longitude: String,
      latitude: String,
      isRandom: Boolean,
    },
    creationDate: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

projectSchema.statics.isNameTaken = async function (name, orgId) {
  const project = await this.findOne({ name, organizationId: orgId });
  return !!project;
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
