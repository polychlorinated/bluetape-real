const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { epicService } = require('../services');
const { Project } = require('../models');

const createEpic = catchAsync(async (req, res) => {
  console.log(req.body, 'epicepicepicepicepicepicepic');
  const epic = await epicService.createEpic(req.body);
  await Project.findOneAndUpdate({ _id: epic.projectId }, { $inc: { totalEpics: 1 } });
  if (!epic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Epic not found');
  }
  res.status(httpStatus.CREATED).send(epic);
});

const getEpicsForProject = catchAsync(async (req, res) => {
  const result = await epicService.getEpicsForProject(req.params.projectId);

  const sendR = result.filter((el) => {
    return el.totalIssues !== 0;
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Epics not found');
  }
  res.send(sendR);
});

const getEpicById = catchAsync(async (req, res) => {
  const epic = await epicService.getEpicById(req.params.epicId);
  console.log('runrunnrunnrunnn');
  if (!epic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Epic not found');
  }
  res.send(epic);
});

const updateEpicById = catchAsync(async (req, res) => {
  const epic = await epicService.updateEpicById(req.params.epicId, req.body);
  res.send(epic);
});

const deleteEpicById = catchAsync(async (req, res) => {
  await epicService.deleteEpicById(req.params.epicId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEpic,
  getEpicsForProject,
  getEpicById,
  updateEpicById,
  deleteEpicById,
};
