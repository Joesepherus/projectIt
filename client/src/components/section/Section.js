import React, { Component } from 'react'
import './Section.css'
import DisplayAllTasks from '../displayAllTasks/DisplayAllTasks';
import AddTask from '../addTask/AddTask';
import { inject, observer } from 'mobx-react';
import { Card, Icon } from 'semantic-ui-react'

@inject('projectsStore')
@observer
class Section extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  deleteSection = (e) => {
    const { projectsStore, section } = this.props;
    projectsStore.deleteSection(section);

  }

  render() {
    return (
      <div className='section'>
        <Card>
          <Card.Content
            className='card-head'>
            <h3>{this.props.section.title}</h3>
            <span aria-hidden="true"
              onClick={this.deleteSection.bind(this)}>&times;</span>
          </Card.Content>
          <Card.Content
            description={
              <DisplayAllTasks
                section={this.props.section}
                sectionId={this.props.index}
                removeTask={this.props.removeTask}
                completeTask={this.props.completeTask}
              />}
          />
          <Card.Content extra>
            {this.props.section ? <AddTask
              section={this.props.section}
              addNewTask={this.props.addNewTask}
              index={this.props.index}
            /> : ''}
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default Section