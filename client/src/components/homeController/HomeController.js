import React, { Component } from 'react'
import PropTypes from 'prop-types' //ES6


import './HomeController.css'
import AllProjects from '../allProjects/AllProjects';

class HomeController extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <AllProjects
        projects={this.props.projects}
        selectProject={this.props.selectProject}
      />
    )
  }
}

HomeController.propTypes = {

};

export default HomeController