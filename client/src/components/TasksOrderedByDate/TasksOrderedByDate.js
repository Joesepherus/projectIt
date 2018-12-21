import React, { Component } from "react";
import "./TasksOrderedByDate.css";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { spacing } from "../../styles/base/spacing";

const styles = theme => ({
  text: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: "center",
    color: "#fff",
    padding: 20
  }
});

class TasksOrderedByDate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTasks = () => {
    if (this.props.tasks.length !== 0) {
      let currentDate = moment(this.props.tasks[0].completed_date).format(
        "DD/MM/YYYY"
      );
      return this.props.tasks.map((task, index) => {
        let taskDate = moment(task.completed_date).format("DD/MM/YYYY");
        if (taskDate !== currentDate || index === 0) {
          currentDate = taskDate;
          return (
            <div>
              {task.completed_date !== "" ? (
                <p>{taskDate}</p>
              ) : (
                  <p>In progress</p>
                )}
              <p>
                {task.completed_date !== ""
                  ? moment(task.completed_date).format("hh:mm A")
                  : null}{" "}
                {task.section.title + " -- " + task.title}
              </p>
            </div>
          );
        } else {
          return (
            <p>
              {task.completed_date !== ""
                ? moment(task.completed_date).format("hh:mm A")
                : null}{" "}
              {task.section.title + " -- " + task.title}
            </p>
          );
        }
      });
    }
  };

  renderTodaysTasks = () => {
    const { todaysTasks } = this.props;
    console.log("todaysTasks", todaysTasks)
    if (todaysTasks.length > 0) {
      let helper = [{
        section: todaysTasks[0].section.title,
        tasks: []
      }]

      todaysTasks.map(task => {
        let found = false
        helper.map(help => {
          if (help.section === task.section.title) {
            help.tasks.push(task)
            found = true
          }
        })
        if (!found) {
          helper.push({ section: task.section.title, tasks: [] })
          helper[helper.length - 1].tasks.push(task)
        }

        //   if (prevSection !== task.section.title) {
        //     prevSection = task.section.title;
        //     return <span><br></br><br></br><strong>{task.section.title}</strong>{" -- " + task.title + "; "}</span>;
        //   } else {
        //     return <span>{task.title + "; "}</span>;
        //   }
        // });
      })
      return helper.map(help => {
        return <div><span><br></br><br></br><strong>{help.section}</strong>{" -- "}</span>
          {help.tasks.map(task => {
            return <span>{task.title + '; '}</span>
          })}
        </div>
      })
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.text}>
        {this.props.todaysTasks ? <div><hr></hr>{this.renderTodaysTasks()}<hr></hr></div> : undefined}
        {this.props.tasks ? this.renderTasks() : undefined}
      </div>
    );
  }
}

export default withStyles(styles)(TasksOrderedByDate);
