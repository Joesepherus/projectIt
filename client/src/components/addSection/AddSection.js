import React, { Component } from "react";
import axios from "axios";
import "./AddSection.css";
import { Card, Input } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

@inject("projectsStore")
@observer
class AddSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  componentWillUnmount() {
    const { projectsStore } = this.props;
    projectsStore.resetInputs();
  }

  handleChange = (type, e) => {
    this.props.projectsStore.handleSectionChange(type, e.target.value);
  };

  handleSubmit(e) {
    const { projectsStore } = this.props;
    if (projectsStore.sectionInputs.title !== "") {
      projectsStore.sectionInputs.id = projectsStore.project.sections.length;
      this.props.projectsStore.addSection(projectsStore.sectionInputs);
    }
  }

  render() {
    const { projectsStore } = this.props;

    return (
      <div className="addSection">
        <Card>
          <Card.Content>
            <Input
              type="text"
              name="title"
              placeholder="title"
              value={projectsStore.sectionInputs.title}
              onChange={this.handleChange.bind(this, "title")}
              onBlur={this.handleSubmit.bind(this)}
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

AddSection.propTypes = {};

export default AddSection;
