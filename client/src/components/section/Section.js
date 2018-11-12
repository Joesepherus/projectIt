import React, { Component } from "react";
import "./Section.css";
import DisplayAllTasks from "../displayAllTasks/DisplayAllTasks";
import AddTask from "../addTask/AddTask";
import { inject, observer } from "mobx-react";
import { Card, Icon } from "semantic-ui-react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { spacing } from "../../styles/base/spacing";

const styles = theme => ({
  title: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: "center"
  },
  sectionContainer: {
    marginBottom: "30px!important"
  }
});

@inject("projectsStore")
@observer
class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.section
    };
  }

  handleChange = type => e => {
    this.setState({
      [type]: e.target.value
    });
    // this.props.projectsStore.handleChange(type, e.target.value)
  };

  handleSubmit = e => {
    const { projectsStore } = this.props;
    const section = this.state;
    if (section.title !== "") {
      let promise = new Promise((resolve, reject) => {
        resolve(projectsStore.updateSection(section));
      });
      promise.then(response => {
        projectsStore.getProjects();
      });
    }
  };

  deleteSection = e => {
    const { projectsStore, section } = this.props;
    projectsStore.deleteSection(section);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="section">
        <Card className={classes.sectionContainer}>
          <Card.Content className="card-head">
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
                  input: classes.title
                }
              }}
            />
            <span aria-hidden="true" onClick={this.deleteSection.bind(this)}>
              &times;
            </span>
          </Card.Content>
          <Card.Content
            description={
              <DisplayAllTasks
                section={this.props.section}
                sectionId={this.props.index}
                removeTask={this.props.removeTask}
                completeTask={this.props.completeTask}
              />
            }
          />
          <Card.Content extra>
            {this.props.section ? (
              <AddTask
                section={this.props.section}
                addNewTask={this.props.addNewTask}
                index={this.props.index}
              />
            ) : (
              ""
            )}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Section);
