const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { User } = require('../models');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});
const completeImageUpload = catchAsync(async (req, res) => {
  console.log(req.file);

  const user = await User.findByIdAndUpdate(
    req.params.key,
    { profile: req.file.filename },
    { new: true, useFindAndModify: true }
  );
  console.log(user);
  // global.socketio.emit('fetch_notifications');
  res.status(httpStatus.CREATED).send(user);
});
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const currentUser = catchAsync(async (req, res) => {
  res.send({
    currentUser: {
      id: 187135,
      name: 'Lord Gaben',
      email: 'gaben@jira.guest',
      avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
      createdAt: '2021-11-21T07:18:51.936Z',
      updatedAt: '2021-11-21T07:18:51.949Z',
      projectId: 62131,
    },
  });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  currentUser,
  completeImageUpload,
};
