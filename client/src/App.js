import React, { Component } from 'react'
import './App.css'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Main from './components/Main/Main'
import { inject, observer } from 'mobx-react'
import CustomDialog from './components/complex/CustomDialog/CustomDialog'
import CustomSnackbar from './components/complex/CustomSnackbar/CustomSnackbar'
import projectsStore from './stores/projectsStore'

@inject('projectsStore')
@inject('store')
@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sections: [],
      selectedProject: '',
      projects: [
        {
          title: 'project1',
          description: 'lplp',
          sections: [
            {
              description: 'aaaa'
            },
            {
              description: 'bbbb'
            }
          ]
        }
      ]
    }
  }

  selectProject = (project) => {
    let self = this
    axios
      .put('/api/project/' + project._id, project)
      .then(function (response) {
        self.setState({
          selectedProject: response.data
        })
        self.props.history.push(`/project/${project._id}`)
      })
      .catch(function (error) {})
  }

  addNewTask = (title, sectionId, taskId) => {
    axios
      .post('/api/task/', {
        title: title,
        sectionId: sectionId,
        id: taskId
      })
      .then(function (response) {})
      .catch(function (error) {})
    this.selectProject(this.state.selectedProject)
  }

  addNewSection = (title, projectId, sectionId) => {
    axios
      .post('/api/section/', {
        title: title,
        projectId: projectId,
        id: sectionId
      })
      .then(function (response) {})
      .catch(function (error) {})
    this.selectProject(this.state.selectedProject)
  }

  removeSection = (sectionId) => {
    let newProject = Object.assign({}, this.state.selectedProject)
    newProject.sections.plice(sectionId, 1)
    axios
      .put('/api/project/' + this.state.selectedProject._id, newProject)
      .then(function (response) {})
      .catch(function (error) {})
    // this.getAllProjects();
  }

  removeTask = (taskId, sectionId) => {
    let newProject = Object.assign({}, this.state.selectedProject)
    newProject.sections[sectionId].tasks.splice(taskId, 1)
    axios
      .put('/api/project/' + this.state.selectedProject._id, newProject)
      .then(function (response) {})
      .catch(function (error) {})
    // this.getAllProjects();
  }

  completeTask = (task) => {
    axios
      .put('/api/task/completed/' + task._id, task)
      .then(function (response) {})
      .catch(function (error) {})
    // this.getAllProjects();
  }

  render() {
    return (
      <div className="App">
        <Main
          selectedProject={this.state.selectedProject}
          sections={this.state.sections}
          removeProject={this.removeProject}
          addNewProject={this.addNewProject}
          addNewTask={this.addNewTask}
          addNewSection={this.addNewSection}
          removeSection={this.removeSection}
          removeTask={this.removeTask}
          completeTask={this.completeTask}
          history={this.props.history}
          selectProject={this.selectProject}
        />

        <CustomDialog
          open={projectsStore.dialogData.open}
          type={projectsStore.dialogData.type}
          content={projectsStore.dialogData.content}
          index={projectsStore.dialogData.index}
          onChange={this.onChange}
          action={projectsStore.dialogData.action}
        />
        <CustomSnackbar
          message={this.props.projectsStore.dataSnackbar.msg}
          open={this.props.projectsStore.dataSnackbar.open}
        />
      </div>
    )
  }
}

export default withRouter(App)
