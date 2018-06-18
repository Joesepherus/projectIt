import React, { Component } from 'react'
import axios from 'axios';
import './AddSection.css'

class AddSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.project);
    let newProject = Object.assign({}, this.props.project);
    newProject.sections.push({ description: this.state.description });
    console.log(newProject);
    axios.put("/api/project/" + this.props.project._id, newProject)
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

  appropriateChange(callback, e) {
    return callback(e);
  }

  handleChange = (type, e) => {
    this.appropriateChange(type, e);
  }

  render() {
    return (
      <div className='addSection'>
        <input
          type="text"
          name="description"
          placeholder="section description"
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

AddSection.propTypes = {

};

export default AddSection