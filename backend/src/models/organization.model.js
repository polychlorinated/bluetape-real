const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orgSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    projects: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Project',
      required: true,
    },
    members: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'User',
    },
    memebersAllProjects: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orgSchema.plugin(toJSON);
orgSchema.plugin(paginate);

orgSchema.statics.isOrganizationNameTaken = async function (name) {
  const organization = await this.findOne({ name });
  return !!organization;
};

const Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;
