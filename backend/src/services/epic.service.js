const { Epic, Issue } = require('../models');

const createEpic = async (epicBody) => {
  return Epic.create(epicBody);
};

const getEpicsForProject = async (projectId) => {
  return Epic.find({ projectId });
};

const getEpicById = async (id) => {
  return Epic.findById(id).populate({
    path: 'comments',
    populate: {
      path: 'user',
    },
  });
};

const updateEpicById = async (epicId, updateBody) => {
  return Epic.findOneAndUpdate({ _id: epicId }, updateBody);
};

const deleteEpicById = async (epicId) => {
  await Issue.remove({ epicId });
  await Epic.remove({ _id: epicId });
};

module.exports = {
  createEpic,
  getEpicsForProject,
  getEpicById,
  updateEpicById,
  deleteEpicById,
};
