const httpStatus = require('http-status');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');

const createComment = async (commentBody) => {
  return Comment.create(commentBody);
};

const getCommentById = (id) => {
  return Comment.findById(id);
};

const updateComment = async (commentId, updateBody) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Epic not found');
  }
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
};

const deleteComment = async (commentId) => {
  await Comment.remove({ _id: commentId });
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
