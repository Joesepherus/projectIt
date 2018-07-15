
import React, { Component } from 'react';
import './TasksOrderedByDate.css';
import moment from 'moment';

class TasksOrderedByDate extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  renderTasks = () => {
    if (this.props.tasks.length !== 0) {
      let currentDate = moment(
        this.props.tasks[0].create_date).format('DD/MM/YYYY');
      return this.props.tasks.map(task => {
        let taskDate = moment(
          task.create_date).format('DD/MM/YYYY');
        console.log(taskDate);
        console.log(currentDate);
        if (taskDate !== currentDate) {
          currentDate = taskDate;
          return (<div>
            <p>{taskDate}</p>
            <p>{task.title}</p>
          </div>
          )
        }
        else {
          return <p>{task.title}</p>
        }
      }
      )
    }
  }

  render() {
    console.log(this.props.tasks);
    return (
      <div className='TasksOrderedByDate'>
        {this.props.tasks ? this.renderTasks() : ''}
      </div>
    )
  }
}

export default TasksOrderedByDate