
import React, { Component } from 'react';
import './SectionPreview.scss';
import { Card, Icon } from 'semantic-ui-react'
import DisplayAllTasks from '../displayAllTasks/DisplayAllTasks';
import AddTask from '../addTask/AddTask';

class SectionPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className='SectionPreview' >
        {this.props.section.description}
      </div>
    )
  }
}

export default SectionPreview