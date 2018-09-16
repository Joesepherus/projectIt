import React, { Component } from 'react'
import './AddProject.css'
import { Card, Input } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';

@inject('projectsStore')
@observer
class AddProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }
  }

  componentWillUnmount() {
    const { projectsStore } = this.props;
    projectsStore.resetInputs();
  }

  handleChange = (type, e) => {
    this.props.projectsStore.handleChange(type, e.target.value)
  }

  handleSubmit(e) {
    const { projectsStore } = this.props;
    if (projectsStore.inputs.title !== '' &&
      projectsStore.inputs.description !== '') {
      let promise = new Promise((resolve, reject) => {
        resolve(this.props.projectsStore.addProject(projectsStore.inputs));
      });
      promise.then((response) => {
        projectsStore.getProjects();
      });
    }
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Input
            type="text"
            name="title"
            placeholder="title"
            value={this.props.projectsStore.inputs.title}
            onChange={this.handleChange.bind(this, 'title')}
            onBlur={this.handleSubmit.bind(this)}
          />
          <Input
            type="text"
            name="description"
            placeholder="description"
            value={this.props.projectsStore.inputs.description}
            onChange={this.handleChange.bind(this, 'description')}
            onBlur={this.handleSubmit.bind(this)}
          />
        </Card.Content>
      </Card>
    )
  }
}

export default AddProject;