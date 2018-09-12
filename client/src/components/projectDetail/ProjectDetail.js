import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './ProjectDetail.css'
import AddSection from '../addSection/AddSection';
import Section from '../section/Section';
import { inject, observer } from 'mobx-react';


@inject('projectsStore')
@observer
class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  renderSections() {
    const { projectsStore } = this.props;
    return (
      projectsStore.project.sections.map((section, i) =>
        <Section
          key={i}
          section={section}
          project={projectsStore.project}
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
    const { projectsStore } = this.props;

    console.log(projectsStore.project);
    return (
      <div className='projectDetail'>
        <Link to='/'>back</Link>
        <p>projects title: {projectsStore.project.title}</p>
        <p>projects description: {projectsStore.project.description}</p>
        <div className='sections'>

          {projectsStore.project.sections ? this.renderSections() : ''}

          <AddSection
            project={projectsStore.project}
            addNewSection={this.props.addNewSection}
          />
        </div>

      </div>
    )
  }
}

export default ProjectDetail