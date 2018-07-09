var mongoose = require('mongoose');

var schema = mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  projectId: {
    type: Number
  },
  tasks: {
    type: []
  },
  state: {
    type: String
  },
  created_by: {
    type: String,
  },
  create_date: {
    type: Date,
  },
  removed_date: {
    type: Date,
  }
});

var Section = module.exports = mongoose.model('Section', schema);

module.exports.getAllSections = function (id, callback, limit) {
  Section.find(callback).limit(limit);
}

module.exports.getAllSectionsOfProject = function (id, callback, limit) {
  // Section.find(callback).limit(limit);
  console.log(id);
  Section.find({ projectId: id }, callback);
}

module.exports.getProjectById = function (sectionId, callback) {
  Section.findById(sectionId, callback);
}

module.exports.addSection = function (section, callback) {
  var json = {
    id: section.id,
    projectId: section.projectId,
    title: section.title,
    state: "inprogress",
  }
  Section.create(json, callback);
}

module.exports.updateSection = function (id, section, options, callback) {
  var query = { _id: id };
  console.log(section);
  var update = {
    title: section.title,
    state: section.state
  }
  Section.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeSection = function (id, section, options, callback) {
  var query = { _id: id };
  var update = {
    state: "removed",
  }
  Section.findOneAndUpdate(query, update, options, callback);
}

module.exports.deletePermanentlySection = function (id, callback) {
  var query = { _id: id };
  Section.deleteOne(query, callback);
}