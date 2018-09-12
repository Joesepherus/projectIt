import React, { Component, PropTypes } from 'react'
import './AddTask.css'
import { Card, Input } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';

@inject('projectsStore')
@observer
class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  componentWillUnmount() {
    const { projectsStore } = this.props;
    projectsStore.resetInputs();
  }

  handleChange = (type, e) => {
    const { projectsStore } = this.props;
    projectsStore.handleTaskChange(type,
      e.target.value)
  }

  handleSubmit(e) {
    const { projectsStore, section } = this.props;
    if (projectsStore.taskInputs.title !== '') {
      projectsStore.addTask(section, projectsStore.taskInputs);
    }
  }

  render() {
    const { projectsStore } = this.props;

    return (
      <div className='AddTask'>
        <Input
          type="text"
          name="title"
          placeholder="task"
          value={projectsStore.taskInputs.title}
          onChange={this.handleChange.bind(this, 'title')}
          onBlur={this.handleSubmit.bind(this)} />
      </div>
    )
  }
}

export default AddTask;