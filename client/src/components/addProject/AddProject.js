import React, { Component } from 'react'
import './AddProject.css'
import axios from 'axios';

class AddProject extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post("/api/project", {
      title: this.state.title,
      description: this.state.description,
    })
      .then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
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
        <input
          type="text"
          name="title"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleChange.bind(this, this.changeTitle)} />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleChange.bind(this, this.changeDescription)} />
        <button
          onClick={this.handleSubmit.bind(this)}>
          Submit
          </button>
      </div>
    )
  }
}

export default AddProject