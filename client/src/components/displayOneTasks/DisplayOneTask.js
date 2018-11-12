import React, { Component } from "react";
import PropTypes from "prop-types"; //ES6
import * as tasksActions from "../../actions/tasksActions";
import "./DisplayOneTask.css";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { spacing } from "../../styles/base/spacing";

const styles = theme => ({
  text: {
    fontSize: 14,
    fontWeight: 200
  }
});

@inject("projectsStore")
@observer
class DisplayOneTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.task
    };
  }

  completeTask = e => {
    const { projectsStore, section } = this.props;
    let task = this.state;

    if (task.completed_date !== "") {
      task.completed_date = "";
      task.state = "inprogress";
    } else {
      task.completed_date = new Date();
      task.state = "completed";
    }
    let promise = new Promise((resolve, reject) => {
      resolve(projectsStore.updateTask(task, section));
    });
    promise.then(response => {
      projectsStore.getProjects();
    });
  };

  handleChange = type => e => {
    this.setState({
      [type]: e.target.value
    });
    // this.props.projectsStore.handleChange(type, e.target.value)
  };

  handleSubmit = e => {
    const { projectsStore, section } = this.props;
    const task = this.state;

    if (task.title !== "") {
      let promise = new Promise((resolve, reject) => {
        resolve(projectsStore.updateTask(task, section));
      });
      promise.then(response => {
        projectsStore.getProjects();
      });
    }
  };

  deleteTask = e => {
    const { projectsStore, task, section } = this.props;
    projectsStore.deleteTask(task, section);
  };

  // isHovering = () => {
  //   console.log(this.state.isHovering);
  //   this.setState({
  //     isHovering: !this.state.isHovering
  //   })
  // }

  render() {
    const { classes } = this.props;

    return (
      <div className="DisplayOneTask">
        <p
        // onMouseEnter={this.isHovering.bind(this)}
        // onMouseLeave={this.isHovering.bind(this)}
        >
          <span
            aria-hidden="true"
            onClick={this.completeTask.bind(this)}
            className={" hovering"}
          >
            ✓
          </span>
          {this.state.completed_date !== "" && <b>DONE </b>}
          <TextField
            type="text"
            placeholder="title"
            value={this.state.title}
            onChange={this.handleChange("title")}
            onBlur={this.handleSubmit.bind(this)}
            className={classes.textField}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.text
              }
            }}
          />
          <span
            aria-hidden="true"
            onClick={this.deleteTask.bind(this)}
            className={" hovering"}
          >
            &times;
          </span>
        </p>
      </div>
    );
  }
}

DisplayOneTask.propTypes = {};

export default withStyles(styles)(DisplayOneTask);
