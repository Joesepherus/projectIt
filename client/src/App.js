import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeController from './components/homeController/HomeController';
import { Switch, Route } from 'react-router-dom';
import LoginController from './components/loginController/LoginController';
import AddProjectController from './components/addProjectController/AddProjectController';
import ProjectDetail from './components/projectDetail/ProjectDetail';
import history from './history';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

  componentDidMount() {
    fetch('/api/project')
      .then((response) => response.json())
      .then(projects => {
        this.setState({
          projectsNumber: projects.length + 1
        })
        this.setState({
          projects: projects
        })
      })
  }

  selectProject = (project) => {
    this.setState({
      selectedProject: project
    });
    console.log(this.props.history);
  }

  addNewTask = (section, section_id) => {
    let newProject = Object.assign({}, this.state.selectedProject);
    newProject.sections[section_id] = section;
    axios.put("/api/project/" + this.state.selectedProject._id, newProject)
    .then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    console.log(this.state.selectedProject);

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={(props) =>
            <HomeController
              projects={this.state.projects}
              selectedProject={this.props.selectedProject}
              selectProject={this.selectProject}
            />
          } />

          <Route exact path='/login' render={(props) =>
            <LoginController
            />
          } />

          <Route exact path='/add' render={(props) =>
            <AddProjectController
            />
          } />

          <Route exact path='/project' render={(props) =>
            <ProjectDetail
              project={this.state.selectedProject}
              addNewTask={this.addNewTask}
            />
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
