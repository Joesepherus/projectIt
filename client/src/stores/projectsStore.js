import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { addProject, deleteProject } from '../actions/projectsActions';
// import * as constants from '../../constants/constants';
// import { toast } from 'react-toastify';
// import { toJS } from 'mobx';

export class AccountStore {
  @observable projects = [];
  @observable project;
  @observable projectsLength;
  @observable inputs = {
    title: '',
    description: ''
  };

  @action resetInputs() {
    this.inputs = {}
    this.sectionInputs = {}
    this.taskInputs = {}
  }

  @action handleChange(type, value) {
    this.inputs[type] = value;
  }

  // projects
  @action getProjects() {
    return axios.get("/api/project")
      .then(response => {
        console.log(response);
        this.projects = response.data;
        this.projectsLength = response.data.length;
        return response;
      }).catch(error => {
        console.log(error);
        throw (error);
      });
  }

  @action getProject() {
    return axios.get("/api/project/" + this.project._id)
      .then(response => {
        console.log(response);
        this.project = response.data;
        // this.setSectionId(this.project.sections.length);
        return response;
      }).catch(error => {
        console.log(error);
        throw (error);
      });
  }

  @action addProject(project) {
    console.log(project)
    let promise = new Promise((resolve, reject) => {
      resolve(
        axios.post("/api/project", {
          project
        })
          .then(function (response) {
            console.log(response);
            return response;
          }).catch(function (error) {
            console.log(error);
          })
      )
    })
    promise.then((response) => {
      this.getProjects();
      this.getProject();
    });
  }

  @action selectProject(project) {
    this.project = project;
    // this.setSectionId(project.sections.length);
  }

  @action updateProject(project) {
    return axios.put('api/project/' + project._id, {
      project: project
    })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error;
      })
  }

  @action deleteProject(project) {
    return axios.delete('api/project/deleted/' + project._id, {
      project: project
    })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  //  sections
  @observable sectionInputs = {
    title: ''
  };

  @action handleSectionChange(type, value) {
    this.sectionInputs[type] = value;
  }

  @action setSectionId(id) {
    console.log(id);
    this.sectionInputs.id = id;
  }

  @action addSection(section) {
    this.project.sections.push(section);
    console.log(this.project)
    console.log(section)
    let promise = new Promise((resolve, reject) => {
      resolve(
        axios.put("/api/project/" + this.project._id, {
          project: this.project
        })
          .then(response => {
            console.log(response);
            return response;
          }).catch(error => {
            console.log(error);
          }));
    })
    promise.then((response) => {
      this.getProjects();
      this.getProject();
    });
  }

  @action updateSection(section) {
    console.log(section);
    let found = this.project.sections.findIndex(function (element) {
      return element.id === section.id
    });
    console.log(found);

    this.project.sections[found] = section;


    let promise = new Promise((resolve, reject) => {
      resolve(
        axios.put("/api/project/" + this.project._id, {
          project: this.project
        })
          .then(response => {
            console.log(response);
            return response;
          }).catch(error => {
            console.log(error);
          })
      )
    })
    promise.then((response) => {
      this.getProjects();
      this.getProject();
    });
  }

  @action deleteSection(section) {
    console.log(section.id);
    let found = this.project.sections.findIndex(function (element) {
      return element.id === section.id
    });
    console.log(found);

    this.project.sections.splice(found, 1);


    let promise = new Promise((resolve, reject) => {
      resolve(
        axios.put("/api/project/" + this.project._id, {
          project: this.project
        })
          .then(response => {
            console.log(response);
            return response;
          }).catch(error => {
            console.log(error);
          })
      )
    })
    promise.then((response) => {
      this.getProjects();
      this.getProject();
    });
  }

  // tasks

  @observable taskInputs = {
    title: ''
  };

  @action handleTaskChange(type, value) {
    this.taskInputs[type] = value;
  }

  @action addTask(section, task) {
    let foundSectionIndex = this.project.sections.findIndex(function (element) {
      return element.id === section.id
    });
    if (this.project.sections[foundSectionIndex].tasks === undefined) {
      task.id = 0;
      this.project.sections[foundSectionIndex].tasks = [];
    }
    else {
      task.id = this.project.sections[foundSectionIndex].tasks.length;
    }
    this.project.sections[foundSectionIndex].tasks.push(task);
    let promise = new Promise((resolve, reject) => {
      resolve(
        axios.put("/api/project/" + this.project._id, {
          project: this.project
        })
          .then(response => {
            console.log(response);
            return response;
          }).catch(error => {
            console.log(error);
          }));
    })
    promise.then((response) => {
      this.getProjects();
      this.getProject();
    });
  }

  @action deleteTask(task, section) {
    console.log(this.project);
    console.log(section);
    console.log(task);
    let foundSectionIndex = this.project.sections.findIndex(
      function (element) {
        console.log(element.id)
        console.log(section.id)
        return element.id === section.id
      });
    let foundTaskIndex = this.project.sections[foundSectionIndex].tasks.findIndex(
      function (element) {
        return element.id === task.id
      });
    console.log(foundSectionIndex);
    console.log(foundTaskIndex);

    this.project.sections[foundSectionIndex].tasks.splice(foundTaskIndex, 1);


    let promise = new Promise((resolve, reject) => {
      resolve(
        axios.put("/api/project/" + this.project._id, {
          project: this.project
        })
          .then(response => {
            console.log(response);
            return response;
          }).catch(error => {
            console.log(error);
          })
      )
    })
    promise.then((response) => {
      this.getProjects();
      this.getProject();
    });
  }

  @action updateTask(task, section) {
    console.log(this.project);
    console.log(section);
    console.log(task);
    let foundSectionIndex = this.project.sections.findIndex(
      function (element) {
        console.log(element.id)
        console.log(section.id)
        return element.id === section.id
      });
    let foundTaskIndex = this.project.sections[foundSectionIndex].tasks.findIndex(
      function (element) {
        return element.id === task.id
      });
    console.log(foundSectionIndex);
    console.log(foundTaskIndex);

    this.project.sections[foundSectionIndex]
      .tasks[foundTaskIndex] = task;


    let promise = new Promise((resolve, reject) => {
      resolve(
        axios.put("/api/project/" + this.project._id, {
          project: this.project
        })
          .then(response => {
            console.log(response);
            return response;
          }).catch(error => {
            console.log(error);
          })
      )
    })
    promise.then((response) => {
      this.getProjects();
      this.getProject();
    });
  }

}

export default new AccountStore();
