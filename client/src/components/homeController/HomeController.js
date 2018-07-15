import React, { Component } from 'react'
import './HomeController.css'
import AllProjects from '../AllProjects/AllProjects';

class HomeController extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <AllProjects
        sections={this.props.sections}
        selectProject={this.props.selectProject}
        removeProject={this.props.removeProject}
        addNewProject={this.props.addNewProject}
        history={this.props.history}
      />
    )
  }
}

HomeController.propTypes = {

};

export default HomeController