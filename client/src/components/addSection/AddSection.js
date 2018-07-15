import React, { Component } from 'react'
import axios from 'axios';
import './AddSection.css'
import { Card, Input } from 'semantic-ui-react'

class AddSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  handleSubmit(e) {
    if (this.state.title !== '') {
      this.props.addNewSection(this.state.title, this.props.project.id, this.props.project.sections.length);
    }
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
    console.log(this.props.project);
    return (
      <div className='addSection'>
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
          </Card.Content>
        </Card>
      </div>
    )
  }
}

AddSection.propTypes = {

};

export default AddSection