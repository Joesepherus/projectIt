import React, { Component } from "react";
import "./AllProjects.css";
import ProjectPreview from "../projectPreview/ProjectPreview";
import AddProject from "../addProject/AddProject";
import { inject, observer } from "mobx-react";

@inject("projectsStore")
@observer
class AllProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { projectsStore } = this.props;
    projectsStore.getProjects();
  }

  renderProjectList = () => {
    return this.props.projectsStore.projects.map((project, i) => (
      <ProjectPreview
        key={i}
        index={i}
        project={project}
        selectProject={this.props.selectProject}
        removeProject={this.props.removeProject}
        history={this.props.history}
      />
    ));
  };

  render() {
    return (
      <div className="allProjects">
        {this.renderProjectList()}
        <AddProject
          addNewProject={this.props.addNewProject}
          projectsLength={this.props.projectsStore.projectLength}
        />
      </div>
    );
  }
}

// export default AllProjects

export default AllProjects;
