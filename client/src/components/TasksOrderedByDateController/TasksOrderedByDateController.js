
import React, { Component } from 'react';
import './TasksOrderedByDateController.css';
import TasksOrderedByDate from '../TasksOrderedByDate/TasksOrderedByDate';
import axios from 'axios';

class TasksOrderedByDateController extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'all',
      selectedTasks: [],
    }
  }

  componentDidMount() {
    this.getAllTasks();
  }

  getAllTasks = () => {
    let self = this;
    console.log('getting tasks');
    console.log(this.state.sections);
    axios.get('/api/task')
      .then(function (response) {
        console.log(response.data);
        self.setState({
          tasks: response.data,
          selectedTasks: response.data
        })
      })
      .catch(function (error) {
      });
  }

  change(event) {
    this.setState({
      value: event.target.value
    });

    let array = [];
    if ('all' === event.target.value) {
      array = Object.assign([], this.state.tasks);
    }
    else {
      for (let i = 0; i < this.state.tasks.length; i++) {
        if (this.state.tasks[i].state === event.target.value) {
          array.push(this.state.tasks[i]);
        }
        console.log(i);
      }
    }
    console.log(array);
    this.setState({
      selectedTasks: array
    });
  }

  render() {
    console.log(this.state.selectedTasks);

    return (
      <div className='TasksOrderedByDateController'>
        <select onChange={this.change.bind(this)} value={this.state.value}>
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="inprogress">inprogress</option>
          <option value="removed">removed</option>
        </select>
        <TasksOrderedByDate
          tasks={this.state.selectedTasks}
        />
      </div>
    )
  }
}

export default TasksOrderedByDateController