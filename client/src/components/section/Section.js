import React, { Component } from 'react'
import './Section.css'
import DisplayAllTasks from '../displayAllTasks/DisplayAllTasks';
import AddTask from '../addTask/AddTask';
import { Card, Icon } from 'semantic-ui-react'


class Section extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className='section'>
        <Card>
          <Card.Content header={this.props.section.description} />
          <Card.Content
            description={
              <DisplayAllTasks
                section={this.props.section} />}
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