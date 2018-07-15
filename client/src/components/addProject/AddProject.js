import React, { Component } from 'react'
import './AddProject.css'
import axios from 'axios';
import { Card, Input } from 'semantic-ui-react'
import * as projectsActions from '../../actions/projectsActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class AddProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }
  }

  handleSubmit(e) {
    if (this.state.description !== '' && this.state.title !== '') {
      // this.props.addNewProject(this.state.title, this.state.description);
      this.props.actions.addProject({
        title: this.state.title,
        description: this.state.description,
        id: this.props.projectsLength
      });
    }
    else {
      console.log("dicks");
    }


  }

  changeDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  appropriateChange(callback, e) {
    return callback(e);
  }

  handleChange = (type, e) => {
    this.appropriateChange(type, e);
  }

  render() {
    return (
      <div className='AddProject'>
        <Card>
          <Card.Content>
            <Input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={this.handleChange.bind(this, this.changeTitle)}
              onBlur={this.handleSubmit.bind(this)}
            />
            <Input
              type="text"
              name="description"
              placeholder="description"
              value={this.state.description}
              onChange={this.handleChange.bind(this, this.changeDescription)}
              onBlur={this.handleSubmit.bind(this)}
            />
          </Card.Content>
        </Card>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AddProject);