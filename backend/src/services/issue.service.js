const { Issue } = require('../models');

const createIssue = async (epicBody) => {
  return Issue.create(epicBody);
};

const getIssuesForEpic = async (epicId) => {
  return Issue.find({ epicId });
};

const getIssueById = async (id) => {
  return Issue.findById(id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .populate('assignee')
    .populate('reporter');
};

const updateIssueById = async (issueId, updateBody) => {
  return Issue.findOneAndUpdate({ _id: issueId }, updateBody, { new: true, useFindAndModify: true });
};

const deleteIssueById = async (issueId) => {
  await Issue.remove({ _id: issueId });
};

module.exports = {
  createIssue,
  getIssuesForEpic,
  getIssueById,
  updateIssueById,
  deleteIssueById,
};
