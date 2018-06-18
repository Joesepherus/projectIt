import React, { Component } from 'react'
import './ProjectPreview.css'
import Section from '../section/Section';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react'
import SectionPreview from '../SectionPreview/SectionPreview';
import DisplayAllTasks from '../displayAllTasks/DisplayAllTasks';

class ProjectPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  renderSections() {
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
    const { selectProject } = this.props;
    e.preventDefault();
    selectProject(this.props.project);
  }

  render() {
    console.log(this.props);
    return (
      <div className='projectPreview'
        onClick={this.handleClick.bind(this)}>
        <Link to='/project'>
          <Card>
            <Card.Content header={this.props.project.title} />
            <Card.Content>
              {this.props.project.sections ?
                <div className='sections'>
                  {this.renderSections()}
                </div>
                : ''}
            </Card.Content>
          </Card>
        </Link>
      </div>
    )
  }
}

export default ProjectPreview