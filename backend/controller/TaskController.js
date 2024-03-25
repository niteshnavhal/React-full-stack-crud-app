const { model } = require("mongoose");
const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
  const task = await TaskModel.find();
  res.send(task);
};

module.exports.saveTask = (req, res) => {
  const { task } = req.body;

  TaskModel.create({ task })
    .then(() => {
      console.log("Saved..");
      res.status(200).send(task);
    })
    .catch((err) => console.log(`${err}`));
};

module.exports.updateTask = (req, res) => {
  const { id } = req.params;

  const { task } = req.body;

  TaskModel.findByIdAndUpdate(id, { task })
    .then(() => {
      console.log("Updated..");
      res.status(200).send(task);
    })
    .catch((err) => console.log(`${err}`));
};

module.exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const { task } = req.body;

  TaskModel.findByIdAndDelete(id)
    .then(() => {
      console.log("Deleted..");
      res.status(200).send("Deleted...");
    })
    .catch((err) => console.log(`${err}`));
};
