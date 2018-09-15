import React, { Component } from 'react'
import PropTypes from 'prop-types' //ES6
import * as tasksActions from '../../actions/tasksActions';
import './DisplayOneTask.css'
import { inject, observer } from 'mobx-react';

@inject('projectsStore')
@observer
class DisplayOneTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false

    }
  }

  completeTask(e) {
    this.props.completeTask(this.props.task);
  }

  deleteTask = (e) => {
    const { projectsStore, task, section } = this.props;
    projectsStore.deleteTask(task, section);
  }

  isHovering = () => {
    console.log(this.state.isHovering);
    this.setState({
      isHovering: !this.state.isHovering
    })
  }

  render() {
    return (
      <div className='DisplayOneTask'>
        <p
          onMouseEnter={this.isHovering.bind(this)}
          onMouseLeave={this.isHovering.bind(this)}
        >
          <span aria-hidden="true"
            onClick={this.completeTask.bind(this)}
            className={this.state.isHovering ? ' hovering' : ''}>✓</span>
          task: {this.props.task.title}
          <span aria-hidden="true"
            onClick={this.deleteTask.bind(this)}
            className={this.state.isHovering ? ' hovering' : ''}>&times;</span></p>
      </div >
    )
  }
}

DisplayOneTask.propTypes = {

};

export default DisplayOneTask;
