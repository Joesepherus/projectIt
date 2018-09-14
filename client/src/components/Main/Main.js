import React, { Component } from 'react';
import './Main.css';
import HomeController from '../HomeController/HomeController';
import { Switch, Route } from 'react-router-dom';
import LoginController from '../loginController/LoginController';
import AddProjectController from '../addProjectController/AddProjectController';
import ProjectDetail from '../projectDetail/ProjectDetail';
import axios from 'axios';
import TasksOrderedByDate from '../TasksOrderedByDate/TasksOrderedByDate';
import TasksOrderedByDateController from '../TasksOrderedByDateController/TasksOrderedByDateController';
import Link from '../../../node_modules/react-router-dom/Link';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className='Main'>
        <Link to='results'>results</Link>
        <Switch>
          <Route exact path='/' render={(props) =>
            <HomeController
              selectedProject={this.props.selectedProject}
              sections={this.props.sections}
              selectProject={this.props.selectProject}
              removeProject={this.props.removeProject}
              addNewProject={this.props.addNewProject}
              history={this.props.history}
            />
          } />

          <Route exact path='/login' render={(props) =>
            <LoginController
            />
          } />

          <Route exact path='/project' render={(props) =>
            <ProjectDetail
              project={this.props.selectedProject}
              addNewTask={this.props.addNewTask}
              addNewSection={this.props.addNewSection}
              removeSection={this.props.removeSection}
              removeTask={this.props.removeTask}
              completeTask={this.props.completeTask}
            />
          } />

          <Route exact path='/results' render={(props) =>
            <TasksOrderedByDateController
            />
          } />
        </Switch>
      </div>
    )
  }
}

export default Main