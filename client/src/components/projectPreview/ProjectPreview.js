import React, { Component } from 'react'
import './ProjectPreview.css'
import { Card, Icon } from 'semantic-ui-react'
import SectionPreview from '../SectionPreview/SectionPreview';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import * as projectsActions from '../../actions/projectsActions';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('projectsStore')
@observer
class ProjectPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  renderSections() {
    console.log(this.props.project);
    return (
      this.props.project.sections.map((section, i) =>
        <SectionPreview
          key={i}
          section={section}
        />
      )
    );
  }

  handleClick = (e) => {
    const { projectsStore } = this.props;
    projectsStore.selectProject(this.props.project);
  }

  deleteProject(e) {
    e.preventDefault();
    const { projectsStore } = this.props;
    console.log(this.props.index);
    let promise = new Promise((resolve, reject) => {
      resolve(projectsStore.deleteProject(this.props.project));
    });
    promise.then((response) => {
      projectsStore.getProjects();
    });
  }


  render() {
    console.log(this.props);
    return (
      <Link to="/project">
        <div className='projectPreview'
          onClick={this.handleClick.bind(this)}>
          <Card>
            <Card.Content>
              <h3>{this.props.project.title}</h3>
              <span aria-hidden="true"
                onClick={this.deleteProject.bind(this)}>&times;</span>
            </Card.Content>

            <Card.Content>
              <div className='sections'>
                {this.props.project.sections[this.props.index] ? this.renderSections() : ''}
              </div>
            </Card.Content>
          </Card>
        </div>
      </Link>
    )
  }
}

ProjectPreview.propTypes = {
  projects: PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    projectsActions: bindActionCreators(projectsActions, dispatch)
  };
}

export default ProjectPreview;
