const Task = require("../models/Task.js");
const asyncWrapper = require("../middleware/async.js");
const { createCustomError } = require("../errors/custom-error.js");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findById(taskID);

  if (!task) {
    const err = createCustomError(`no task with id:${taskID}`, 404);
    console.log(typeof err);
    return next(err);
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete(taskID);
  if (!task) {
    return next(createCustomeError(`no task with id:${taskID}`, 404));
  }
  console.log("hey");
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomeError(`no task with id:${taskID}`, 404));
  }
  console.log("hey");

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
