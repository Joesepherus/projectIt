var mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  adminId: {
    type: String
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
})


var Project = mongoose.model("Project", ProjectSchema)

module.exports = Project

module.exports.getAllProjects = function(callback, limit) {
  Project.find({}, '_id id title sections description',callback).limit(limit);
};

module.exports.getAllProjectsOfAdmin = function (adminId, callback, limit) {
  Project.find({adminId: adminId}, '_id id title sections description', callback).limit(limit)
}


module.exports.getProjectById = function(projectId, callback) {
  Project.findById(projectId, callback);
};

module.exports.addProject = function(project, callback) {
  var json = {
    adminId: project.adminId,
    title: project.title,
    description: project.description,
    state: 'inprogress',
  }
  try{
    Project.create(json, callback);
  }
  catch(err){
    console.log('err', err)
  }
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
