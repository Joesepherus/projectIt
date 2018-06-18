import React, { Component } from 'react'
import PropTypes from 'prop-types' //ES6


import './AllProjects.css'
import ProjectPreview from '../projectPreview/ProjectPreview';

class AllProjects extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  renderProjectList = () => {
    return (
      this.props.projects.map((project, i) =>
        <ProjectPreview
          key={i}
          project={project}
          selectProject={this.props.selectProject}
        />
      )
    );
  }

  render() {
    console.log(this.props);
    return (
      <div className='allProjects'>
        {this.renderProjectList()}
      </div>
    )
  }
}

AllProjects.propTypes = {

};

export default AllProjects