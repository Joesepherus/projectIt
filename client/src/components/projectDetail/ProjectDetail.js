import React, { Component } from 'react'
import PropTypes from 'prop-types' //ES6


import './ProjectDetail.css'
import AddSection from '../addSection/AddSection';
import Section from '../section/Section';

class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  renderSections() {
    return (
      this.props.project.sections.map((section, i) =>
        <Section
          key={i}
          section={section}
          project={this.props.project}
          addNewTask={this.props.addNewTask}
          showTasks={true}
          index={i}
        />
      )
    );
  }

  render() {
    console.log(this.props.project);
    return (
      <div className='projectDetail'>
        <p>projects title: {this.props.project.title}</p>
        <p>projects description: {this.props.project.description}</p>
        {this.renderSections()}
        <AddSection
          project={this.props.project}
        />
      </div>
    )
  }
}

ProjectDetail.propTypes = {

};

export default ProjectDetail