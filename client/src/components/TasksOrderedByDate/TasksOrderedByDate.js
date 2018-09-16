
import React, { Component } from 'react';
import './TasksOrderedByDate.css';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { spacing } from '../../styles/base/spacing';


const styles = theme => ({
  text: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center',
    color: '#fff'
  },
})

class TasksOrderedByDate extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  renderTasks = () => {
    if (this.props.tasks.length !== 0) {
      let currentDate = moment(
        this.props.tasks[0].completed_date).format('DD/MM/YYYY');
      return this.props.tasks.map((task, index) => {
        let taskDate = moment(
          task.completed_date).format('DD/MM/YYYY');
        console.log(taskDate);
        console.log(currentDate);
        if (taskDate !== currentDate || index === 0) {
          currentDate = taskDate;
          return (<div>
            {task.completed_date !== ''

              ?

              <p>{taskDate}</p>

              :

              <p>In progress</p>
            }
            <p>{task.completed_date !== '' ? moment(task.completed_date).format('hh:mm A') : null} {task.title}</p>
          </div>
          )
        }
        else {
          return <p>{task.completed_date !== '' ? moment(task.completed_date).format('hh:mm A') : null} {task.title}</p>
        }
      }
      )
    }
  }

  render() {
    const { classes } = this.props;

    console.log(this.props.tasks);
    return (
      <div className={classes.text}>
        {this.props.tasks ? this.renderTasks() : ''}
      </div>
    )
  }
}

export default withStyles(styles)(TasksOrderedByDate);