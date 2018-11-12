import React, { Component } from "react";
import "./TasksOrderedByDateController.css";
import TasksOrderedByDate from "../TasksOrderedByDate/TasksOrderedByDate";
import axios from "axios";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("projectsStore")
@observer
class TasksOrderedByDateController extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "all", selectedTasks: [], allTasks: [] };
  }

  componentDidMount() {
    this.props.projectsStore.resetTasks();

    this.setState({
      allTasks: [],
      selectedTasks: []
    });
    this.getAllTasks();
  }

  getAllTasks = () => {
    const { projectsStore } = this.props;

    let allTasks = [];
    for (let i = 0; i < projectsStore.projects.length; i++) {
      for (let j = 0; j < projectsStore.projects[i].sections.length; j++) {
        if (projectsStore.projects[i].sections[j].tasks !== undefined) {
          for (
            let k = 0;
            k < projectsStore.projects[i].sections[j].tasks.length;
            k++
          ) {
            let newTask = Object.assign(
              projectsStore.projects[i].sections[j].tasks[k]
            );
            newTask.section = projectsStore.projects[i].sections[j];
            projectsStore.setTasks(newTask);
            allTasks.push(projectsStore.projects[i].sections[j].tasks[k]);
          }
        }
      }
    }
    projectsStore.sortAllTasks();
    // projectsStore.allTasks.sort(function(a, b) {
    //   // Turn your strings into dates, and then subtract them
    //   // to get a value that is either negative, positive, or zero.
    //   if (a.completed_date === "") {
    //     return 1;
    //   }
    //   if (b.completed_date === "") {
    //     return -1;
    //   }
    //   return new Date(b.completed_date) - new Date(a.completed_date);
    // });
    this.setState({
      tasks: projectsStore.allTasks,
      selectedTasks: projectsStore.allTasks
    });
  };

  change(event) {
    this.setState({
      value: event.target.value
    });

    let array = [];
    if ("all" === event.target.value) {
      array = Object.assign([], this.state.tasks);
    } else {
      for (let i = 0; i < this.state.tasks.length; i++) {
        if (this.state.tasks[i].state === event.target.value) {
          array.push(this.state.tasks[i]);
        }
      }
    }
    this.setState({
      selectedTasks: array
    });
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/">back</Link>
        <div className="TasksOrderedByDateController">
          <select onChange={this.change.bind(this)} value={this.state.value}>
            <option value="all">all</option>
            <option value="completed">completed</option>
            <option value="inprogress">inprogress</option>
            <option value="removed">removed</option>
          </select>
          <TasksOrderedByDate tasks={this.state.selectedTasks} />
        </div>
      </React.Fragment>
    );
  }
}

export default TasksOrderedByDateController;
