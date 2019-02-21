import { observable, action } from 'mobx'
import axios from 'axios'
import { v1 as uuid } from 'uuid'

export class AccountStore {
  @observable
  projects = []
  @observable
  project = {
    title: '',
    description: '',
    sections: []
  }
  @observable
  projectsLength
  @observable
  inputs = {
    title: '',
    description: ''
  }
  @observable
  allTasks = []

  @action
  resetInputs() {
    this.inputs = {}
    this.sectionInputs = {}
    this.taskInputs = {}
  }

  @action
  handleChange(type, value) {
    this.inputs[type] = value
  }

  // projects
  @action
  getProjects() {
    return axios
      .get('/api/project')
      .then(response => {
        this.projects = response.data
        this.projectsLength = response.data.length
        return response
      })
      .catch(error => {
        throw error
      })
  }

  @action
  getProject(projectId) {
    return axios
      .get('/api/project/' + projectId)
      .then(response => {
        this.project = response.data
        // this.setSectionId(this.project.sections.length);
        return response
      })
      .catch(error => {
        throw error
      })
  }

  @action
  addProject(project) {
    let promise = new Promise((resolve, reject) => {
      resolve(
        axios
          .post('/api/project', {
            project
          })
          .then(function(response) {
            return response
          })
          .catch(function(error) {})
      )
    })
    promise.then(response => {
      this.getProjects()
      this.getProject(this.project._id)
    })
  }

  @action
  selectProject(project) {
    this.project = project
    // this.setSectionId(project.sections.length);
  }

  @action
  updateProject(project) {
    return axios
      .put('api/project/' + project._id, {
        project: project
      })
      .then(response => {
        return response
      })
      .catch(error => {
        return error
      })
  }

  @action
  deleteProject(project) {
    return axios
      .delete('api/project/deleted/' + project._id, {
        project: project
      })
      .then(response => {
        return response
      })
      .catch(error => {
        return error
      })
  }

  //  sections
  @observable
  sectionInputs = {
    title: ''
  }

  @action
  handleSectionChange(type, value) {
    this.sectionInputs[type] = value
  }

  @action
  setSectionId(id) {
    this.sectionInputs.id = id
  }

  @action
  addSection(section) {
    section.id = uuid()
    this.project.sections.push(section)
    let promise = new Promise((resolve, reject) => {
      resolve(
        axios
          .put('/api/project/' + this.project._id, {
            project: this.project
          })
          .then(response => {
            return response
          })
          .catch(error => {})
      )
    })
    promise.then(response => {
      this.getProjects()
      this.getProject(this.project._id)
    })
  }

  @action
  updateSection(section) {
    let found = this.project.sections.findIndex(function(element) {
      return element.id === section.id
    })

    this.project.sections[found] = section

    let promise = new Promise((resolve, reject) => {
      resolve(
        axios
          .put('/api/project/' + this.project._id, {
            project: this.project
          })
          .then(response => {
            return response
          })
          .catch(error => {})
      )
    })
    promise.then(response => {
      this.getProjects()
      this.getProject(this.project._id)
    })
  }

  @action
  deleteSection(section) {
    let found = this.project.sections.findIndex(function(element) {
      return element.id === section.id
    })

    this.project.sections.splice(found, 1)

    let promise = new Promise((resolve, reject) => {
      resolve(
        axios
          .put('/api/project/' + this.project._id, {
            project: this.project
          })
          .then(response => {
            return response
          })
          .catch(error => {})
      )
    })
    promise.then(response => {
      this.getProjects()
      this.getProject(this.project._id)
    })
  }

  // tasks

  @observable
  taskInputs = {
    title: ''
  }

  @action
  handleTaskChange(type, value) {
    this.taskInputs[type] = value
  }

  @action
  addTask(section, task) {
    let foundSectionIndex = this.project.sections.findIndex(function(element) {
      return element.id === section.id
    })
    task.id = uuid()
    if (this.project.sections[foundSectionIndex].tasks === undefined)
      this.project.sections[foundSectionIndex].tasks = []
    this.project.sections[foundSectionIndex].tasks.push(task)
    let promise = new Promise((resolve, reject) => {
      resolve(
        axios
          .put('/api/project/' + this.project._id, {
            project: this.project
          })
          .then(response => {
            return response
          })
          .catch(error => {})
      )
    })
    promise.then(response => {
      this.getProjects()
      this.getProject(this.project._id)
    })
  }

  @action
  deleteTask(task, section) {
    let foundSectionIndex = this.project.sections.findIndex(function(element) {
      return element.id === section.id
    })
    let foundTaskIndex = this.project.sections[
      foundSectionIndex
    ].tasks.findIndex(function(element) {
      return element.id === task.id
    })

    this.project.sections[foundSectionIndex].tasks.splice(foundTaskIndex, 1)

    let promise = new Promise((resolve, reject) => {
      resolve(
        axios
          .put('/api/project/' + this.project._id, {
            project: this.project
          })
          .then(response => {
            return response
          })
          .catch(error => {})
      )
    })
    promise.then(response => {
      this.getProjects()
      this.getProject(this.project._id)
    })
  }

  @action
  updateTask(task, section) {
    let foundSectionIndex = this.project.sections.findIndex(function(element) {
      return element.id === section.id
    })
    let foundTaskIndex = this.project.sections[
      foundSectionIndex
    ].tasks.findIndex(function(element) {
      return element.id === task.id
    })

    this.project.sections[foundSectionIndex].tasks[foundTaskIndex] = task
    let promise = new Promise((resolve, reject) => {
      resolve(
        axios
          .put('/api/project/' + this.project._id, {
            project: this.project
          })
          .then(response => {
            return response
          })
          .catch(error => {
            return error
          })
      )
    })
    promise.then(response => {
      this.setSnackbar(response.data.message, true)
      this.getProjects()
      this.getProject(this.project._id)
    })
  }

  @action
  setTasks(task) {
    this.allTasks.push(task)
  }

  @action
  resetTasks() {
    this.allTasks = []
  }

  @action
  sortAllTasks() {
    this.allTasks = this.allTasks.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      if (a.completed_date === '') {
        return 1
      }
      if (b.completed_date === '') {
        return -1
      }
      return new Date(b.completed_date) - new Date(a.completed_date)
    })
  }

  // ===== SNACKBAR =====
  @observable dataSnackbar = {
    msg: '',
    open: false
  }
  @action setSnackbar = (msg, state) => {
    this.dataSnackbar.msg = msg
    this.dataSnackbar.open = state
    this.turnOffSnackbar()
  }

  turnOffSnackbar() {
    let data = {
      msg: '',
      open: false
    }
    // clearTimeout(timeout)
    setTimeout(() => {
      this.dataSnackbar = data
    }, 3000)
  }

  // ===== DIALOG =====
  @observable dialogData = {}
  @action
  setDialog = (
    state = false,
    type = '',
    content = '',
    index = 0,
    action = ''
  ) => {
    this.dialogData = {
      type: type,
      content: content,
      open: state,
      index: index,
      action: action
    }
  }

  // ===== ADD NEW TASK INPUT =====
  @observable input = []
  @action
  setInput(input, index) {
    this.input[index] = input
  }
}

export default new AccountStore()
