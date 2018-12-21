import React, { Component } from "react";
import "./App.css";
import HomeController from "./components/HomeController/HomeController";
import { Switch, Route } from "react-router-dom";
import LoginController from "./components/loginController/LoginController";
import AddProjectController from "./components/addProjectController/AddProjectController";
import ProjectDetail from "./components/projectDetail/ProjectDetail";
import axios from "axios";
import TasksOrderedByDate from "./components/TasksOrderedByDate/TasksOrderedByDate";
import TasksOrderedByDateController from "./components/TasksOrderedByDateController/TasksOrderedByDateController";
import Main from "./components/Main/Main";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      selectedProject: "",
      projects: [
        {
          title: "project1",
          description: "lplp",
          sections: [
            {
              description: "aaaa"
            },
            {
              description: "bbbb"
            }
          ]
        }
      ]
    };
  }

  selectProject = project => {
    let self = this;
    axios
      .put("/api/project/" + project._id, project)
      .then(function (response) {
        self.setState({
          selectedProject: response.data
        });
        self.props.history.push("/project");
      })
      .catch(function (error) { });
  };

  addNewTask = (title, sectionId, taskId) => {
    axios
      .post("/api/task/", {
        title: title,
        sectionId: sectionId,
        id: taskId
      })
      .then(function (response) { })
      .catch(function (error) { });
    this.selectProject(this.state.selectedProject);
  };

  addNewSection = (title, projectId, sectionId) => {
    axios
      .post("/api/section/", {
        title: title,
        projectId: projectId,
        id: sectionId
      })
      .then(function (response) { })
      .catch(function (error) { });
    this.selectProject(this.state.selectedProject);
  };

  removeSection = sectionId => {
    let newProject = Object.assign({}, this.state.selectedProject);
    newProject.sections.plice(sectionId, 1);
    axios
      .put("/api/project/" + this.state.selectedProject._id, newProject)
      .then(function (response) { })
      .catch(function (error) { });
    // this.getAllProjects();
  };

  removeTask = (taskId, sectionId) => {
    let newProject = Object.assign({}, this.state.selectedProject);
    newProject.sections[sectionId].tasks.splice(taskId, 1);
    axios
      .put("/api/project/" + this.state.selectedProject._id, newProject)
      .then(function (response) { })
      .catch(function (error) { });
    // this.getAllProjects();
  };

  completeTask = task => {
    axios
      .put("/api/task/completed/" + task._id, task)
      .then(function (response) { })
      .catch(function (error) { });
    // this.getAllProjects();
  };

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
      </div>
    );
  }
}

export default App;
