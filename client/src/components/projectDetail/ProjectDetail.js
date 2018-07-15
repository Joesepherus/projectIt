import React, { Component } from 'react'
import { Link } from 'react-router-dom';

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
          removeSection={this.props.removeSection}
          removeTask={this.props.removeTask}
          completeTask={this.props.completeTask}
        />
      )
    );
  }

  render() {
    console.log(this.props.project);
    return (
      <div className='projectDetail'>
        <Link to='/'>back</Link>
        <p>projects title: {this.props.project.title}</p>
        <p>projects description: {this.props.project.description}</p>
        <div className='sections'>

          {this.props.project.sections ? this.renderSections() : ''}

          <AddSection
            project={this.props.project}
            addNewSection={this.props.addNewSection}
          />
        </div>

      </div>
    )
  }
}

export default ProjectDetail