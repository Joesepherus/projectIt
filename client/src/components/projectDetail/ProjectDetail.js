import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./ProjectDetail.css";
import AddSection from "../addSection/AddSection";
import Section from "../section/Section";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { spacing } from "../../styles/base/spacing";

const styles = theme => ({
  title: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: "center",
    color: "#FFF",
    maxWidth: 200,
    margin: "auto"
  },
  description: {
    fontSize: 14,
    fontWeight: 200,
    textAlign: "center",
    color: "#FFF",
    maxWidth: 200,
    margin: "auto"
  },
  textField: {
    minWidth: "200px",
    // margin: `${spacing.space2} 0px 0px 0px`,
    color: "#FFFF",
    width: "100%"
  },

  inputsContainer: {
    padding: `0 ${spacing.space20}`,
    "@media (max-width: 600px)": {
      padding: 0
    }
  },
  backLink: {
    color: "#fff",
    float: "left",
    fontSize: "45px!important"
  },
  resultsLink: {
    color: "#fff",
    fontSize: "45px!important",
    fontFamily: "Material Icons",
    fontStyle: "normal",
    lineHeight: 1,
    float: "right"
  }
});

@inject("projectsStore")
@observer
class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.projectsStore.project
    };
    let promise = new Promise((resolve, reject) => {
      resolve(this.props.projectsStore.getProject(this.props.match.params.id));
    });

    promise.then(response => {
      this.setState({
        ...this.props.projectsStore.project
      });
    });
  }

  componentDidMount() {
    const { projectsStore, match } = this.props;
    projectsStore.getProjects();
    projectsStore.getProject(match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.projectsStore.project !== this.props.projectsStore.project) {
      this.setState({ ...this.props.project });
    }
  }

  renderSections() {
    const { projectsStore } = this.props;
    return projectsStore.project.sections.map((section, i) => (
      <Section
        key={i}
        section={section}
        project={projectsStore.project}
        addNewTask={this.props.addNewTask}
        showTasks={true}
        index={i}
        removeSection={this.props.removeSection}
        removeTask={this.props.removeTask}
        completeTask={this.props.completeTask}
      />
    ));
  }

  handleChange = type => e => {
    this.setState({
      [type]: e.target.value
    });
    // this.props.projectsStore.handleChange(type, e.target.value)
  };

  handleSubmit = e => {
    const { projectsStore } = this.props;
    const project = this.state;
    if (project.title !== "" && project.description !== "") {
      let promise = new Promise((resolve, reject) => {
        resolve(this.props.projectsStore.updateProject(project));
      });
      promise.then(response => {
        projectsStore.getProjects();
      });
    }
  };

  render() {
    const { projectsStore, classes } = this.props;

    return (
      <div className="projectDetail">
        <Link to="/" className={classes.backLink}>
          <i class="material-icons">arrow_back_ios</i>
        </Link>
        <Link to={`/results`} className={classes.resultsLink}>
          <i>ballot</i>
        </Link>

        {/* <input
          type='text'
          placeholder='title'
          value={this.state.title}
          onChange={this.handleChange.bind(this, 'title')}
          onBlur={this.handleSubmit.bind(this)}
        /> */}

        <Grid container className={classes.inputsContainer} spacing={8}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              placeholder="description"
              value={this.state.description}
              onChange={this.handleChange("description")}
              onBlur={this.handleSubmit.bind(this)}
              className={classes.textField}
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.description
                }
              }}
            />
          </Grid>
        </Grid>

        <div className="sections">
          {projectsStore.project.sections ? this.renderSections() : ""}

          <AddSection
            project={projectsStore.project}
            addNewSection={this.props.addNewSection}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProjectDetail);
