import React, { Component } from 'react'
import './Main.css'
import HomeController from '../HomeController/HomeController'
import { Switch, Route } from 'react-router-dom'
import ProjectDetail from '../projectDetail/ProjectDetail'
import TasksOrderedByDateController from '../TasksOrderedByDateController/TasksOrderedByDateController'
import { withStyles } from '@material-ui/core/styles'
import Login from '../Login/Login'

const styles = theme => ({
  link: {
    color: '#fff',
    fontSize: '45px!important',
    fontFamily: 'Material Icons',
    fontStyle: 'normal',
    lineHeight: 1
  }
})

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="Main">
        <Switch>
          <Route exact path="/login" render={props => <Login />} />
          <Route
            exact
            path="/"
            render={props => (
              <HomeController
                selectedProject={this.props.selectedProject}
                sections={this.props.sections}
                selectProject={this.props.selectProject}
                removeProject={this.props.removeProject}
                addNewProject={this.props.addNewProject}
                history={this.props.history}
              />
            )}
          />

          <Route
            exact
            path={`/project/:id`}
            render={props => (
              <ProjectDetail
                {...props}
                project={this.props.selectedProject}
                addNewTask={this.props.addNewTask}
                addNewSection={this.props.addNewSection}
                removeSection={this.props.removeSection}
                removeTask={this.props.removeTask}
                completeTask={this.props.completeTask}
              />
            )}
          />

          <Route
            exact
            path="/results"
            render={props => <TasksOrderedByDateController />}
          />
        </Switch>
      </div>
    )
  }
}

export default withStyles(styles)(Main)
