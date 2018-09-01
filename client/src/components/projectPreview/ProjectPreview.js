import React, { Component } from 'react'
import './ProjectPreview.css'
import { Card, Icon } from 'semantic-ui-react'
import SectionPreview from '../SectionPreview/SectionPreview';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import * as projectsActions from '../../actions/projectsActions';

class ProjectPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  renderSections() {
    return (
      this.props.sections[this.props.index].map((section, i) =>
        <SectionPreview
          key={i}
          section={section}
        />
      )
    );
  }

  handleClick = (e) => {
    const { selectProject } = this.props;
    e.preventDefault();
    selectProject(this.props.project);
  }

  removeProject(e) {
    console.log(this.props.index);
    this.props.projectsActions.deleteProject(this.props.project._id, this.props.project);
  }


  render() {
    console.log(this.props);
    return (
      <div className='projectPreview'
        onClick={this.handleClick.bind(this)}>
        <Card>
          <Card.Content>
            <h3>{this.props.project.title}</h3>
            <span aria-hidden="true"
              onClick={this.removeProject.bind(this)}>&times;</span>
          </Card.Content>

          <Card.Content>
            <div className='sections'>
              {this.props.sections[this.props.index] ? this.renderSections() : ''}
            </div>
          </Card.Content>
        </Card>
      </div>
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

export default connect(null, mapDispatchToProps)(ProjectPreview);
