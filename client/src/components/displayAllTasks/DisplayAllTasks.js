import React, { Component } from 'react'
import PropTypes from 'prop-types' //ES6


import './DisplayAllTasks.css'
import DisplayOneTask from '../displayOneTasks/DisplayOneTask';

class DisplayAllTasks extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  renderAllTasks() {
    return (
      this.props.section.tasks.map((task, i) =>
        <DisplayOneTask
          key={i}
          task={task}
        />
      )
    );
  }

  render() {
    console.log(this.props.section.tasks);
    return (
      <div className='displayAllTasks'>
        {this.props.section.tasks ? this.renderAllTasks() : ''}
      </div>
    )
  }
}

DisplayAllTasks.propTypes = {

};

export default DisplayAllTasks