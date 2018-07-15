import React, { Component } from 'react'
import './AllProjects.css'
import ProjectPreview from '../projectPreview/ProjectPreview';
import AddProject from '../addProject/AddProject';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

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
          index={i}
          project={project}
          selectProject={this.props.selectProject}
          removeProject={this.props.removeProject}
          sections={this.props.sections}
          history={this.props.history}
        />
      )
    );
  }

  render() {
    console.log(this.props.projects);
    return (
      <div className='allProjects'>
        {this.renderProjectList()}
        <AddProject
          addNewProject={this.props.addNewProject}
          projectsLength={this.props.projects.length}
        />
      </div>
    )
  }
}

// export default AllProjects


AllProjects.propTypes = {
  projects: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    projects: state.projects.projects
  };
}

export default connect(mapStateToProps)(AllProjects);  