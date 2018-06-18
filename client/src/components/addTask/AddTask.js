import React, { Component } from 'react'
import './AddTask.css'
import axios from 'axios';

class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let newSection = Object.assign({}, this.props.section);
    console.log(newSection);

    newSection.tasks.push({ description: this.state.description });
    this.props.addNewTask(newSection, this.props.index);
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
      <div className='AddTask'>
        <input
          type="text"
          name="description"
          placeholder="task"
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

export default AddTask;