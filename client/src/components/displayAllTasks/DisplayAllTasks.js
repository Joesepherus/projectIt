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
          index={i}
          section={this.props.section}
          sectionId={this.props.sectionId}
          removeTask={this.props.removeTask}
          completeTask={this.props.completeTask}
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