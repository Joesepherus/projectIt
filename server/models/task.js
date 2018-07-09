var mongoose = require('mongoose');

var schema = mongoose.Schema({
  id: {
    type: Number,
  },
  sectionId: {
    type: String,
  },
  title: {
    type: String,
  },
  state: {
    type: String,
  },
  created_by: {
    type: String,
  },
  create_date: {
    type: Date,
  },
  completed_date: {
    type: Date,
  },
  removed_date: {
    type: Date,
  }
});

var Task = module.exports = mongoose.model('Task', schema);

module.exports.getAllTasks = function (callback, limit) {
  Task.find(callback).limit(limit);
}

module.exports.getAllTasksOfSection = function (id, callback, limit) {
  console.log('=====');
  console.log(id);
  Task.find({ sectionId: id }, callback);
}

module.exports.getTaskById = function (taskId, callback) {
  Task.findById(taskId, callback);
}

module.exports.addTask = function (task, callback) {
  console.log('????');
  console.log(task.sectionId);
  var json = {
    id: task.id,
    title: task.title,
    sectionId: task.sectionId,
    state: "inprogress",
    create_date: Date.now()
  }
  Task.create(json, callback);
}

module.exports.updateTask = function (id, task, options, callback) {
  var query = { _id: id };
  console.log(task);
  var update = {
    title: task.title,
    state: task.state
  }
  Task.findOneAndUpdate(query, update, options, callback);
}

module.exports.completeTask = function (id, options, callback) {
  var query = { _id: id };
  var update = {
    state: "completed",
    completed_date: Date.now()
  }
  Task.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeTask = function (id, task, options, callback) {
  var query = { _id: id };
  var update = {
    state: "removed",
  }
  Task.findOneAndUpdate(query, update, options, callback);
}

module.exports.deletePermanentlyTask = function (id, callback) {
  var query = { _id: id };
  Task.deleteOne(query, callback);
}