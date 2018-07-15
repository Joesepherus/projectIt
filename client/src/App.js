import React, { Component } from 'react';
import './App.css';
import HomeController from './components/homeController/HomeController';
import { Switch, Route } from 'react-router-dom';
import LoginController from './components/loginController/LoginController';
import AddProjectController from './components/addProjectController/AddProjectController';
import ProjectDetail from './components/projectDetail/ProjectDetail';
import axios from 'axios';
import TasksOrderedByDate from './components/TasksOrderedByDate/TasksOrderedByDate';
import TasksOrderedByDateController from './components/TasksOrderedByDateController/TasksOrderedByDateController';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sections: [],
      selectedProject: '',
      projects: [{
        title: 'project1',
        description: 'lplp',
        sections: [{
          description: 'aaaa'
        },
        {
          description: 'bbbb'
        }
        ]
      }]
    }
  }


  selectProject = (project) => {
    let self = this;
    console.log(project);
    axios.put('/api/project/' + project._id, project)
      .then(function (response) {
        console.log(response.data)
        self.setState({
          selectedProject: response.data
        })
        self.props.history.push('/project');

      })
      .catch(function (error) {
        console.log(error);

      })

  }

  addNewTask = (title, sectionId, taskId) => {
    console.log('!==============');

    axios.post("/api/task/", {
      title: title,
      sectionId: sectionId,
      id: taskId
    })
      .then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    this.selectProject(this.state.selectedProject);
  }


  addNewSection = (title, projectId, sectionId) => {
    console.log(sectionId);
    axios.post("/api/section/", {
      title: title,
      projectId: projectId,
      id: sectionId
    })
      .then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    this.selectProject(this.state.selectedProject);
  }

  removeSection = (sectionId) => {
    let newProject = Object.assign({}, this.state.selectedProject);
    newProject.sections.splice(sectionId, 1);
    axios.put("/api/project/" + this.state.selectedProject._id, newProject)
      .then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    this.getAllProjects();
  }

  removeTask = (taskId, sectionId) => {
    let newProject = Object.assign({}, this.state.selectedProject);
    newProject.sections[sectionId].tasks.splice(taskId, 1);
    axios.put("/api/project/" + this.state.selectedProject._id, newProject)
      .then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    this.getAllProjects();
  }

  completeTask = (task) => {
    axios.put("/api/task/completed/" + task._id, task)
      .then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    this.getAllProjects();
  }

  render() {
    console.log(this.state.sections);

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={(props) =>
            <HomeController
              selectedProject={this.props.selectedProject}
              sections={this.state.sections}
              selectProject={this.selectProject}
              removeProject={this.removeProject}
              addNewProject={this.addNewProject}
              history={this.props.history}
            />
          } />

          <Route exact path='/login' render={(props) =>
            <LoginController
            />
          } />

          <Route exact path='/project' render={(props) =>
            <ProjectDetail
              project={this.state.selectedProject}
              addNewTask={this.addNewTask}
              addNewSection={this.addNewSection}
              removeSection={this.removeSection}
              removeTask={this.removeTask}
              completeTask={this.completeTask}
            />
          } />

          <Route exact path='/results' render={(props) =>
            <TasksOrderedByDateController
            />
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
