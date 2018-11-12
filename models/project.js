var mongoose = require("mongoose");

var schema = mongoose.Schema({
  id: {
    type: Number
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  sections: {
    type: []
  },
  state: {
    type: String
  },
  created_by: {
    type: String
  },
  create_date: {
    type: Date
  },
  completed_date: {
    type: Date
  },
  removed_date: {
    type: Date
  }
});

var Project = (module.exports = mongoose.model("Project", schema));

module.exports.getAllProjects = function(callback, limit) {
  Project.find(callback).limit(limit);
};

module.exports.getProjectById = function(projectId, callback) {
  Project.findById(projectId, callback);
};

module.exports.addProject = function(project, callback) {
  var json = {
    id: project.id,
    title: project.title,
    description: project.description,
    state: "inprogress"
  };
  Project.create(json, callback);
};

module.exports.updateProject = function(id, project, options, callback) {
  var query = { _id: id };
  var update = {
    title: project.title,
    description: project.description,
    sections: project.sections,
    state: project.state
  };
  Project.findOneAndUpdate(query, update, options, callback);
};

module.exports.removeProject = function(id, project, options, callback) {
  var query = { _id: id };
  var update = {
    state: "removed"
  };
  Project.findOneAndUpdate(query, update, options, callback);
};

module.exports.deletePermanentlyProject = function(id, callback) {
  var query = { _id: id };
  Project.deleteOne(query, callback);
};
