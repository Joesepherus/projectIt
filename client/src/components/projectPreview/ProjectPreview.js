import React, { Component } from 'react'
import './ProjectPreview.css'
import { Card, Icon } from 'semantic-ui-react'
import SectionPreview from '../SectionPreview/SectionPreview';
import PropTypes from 'prop-types'
import * as projectsActions from '../../actions/projectsActions';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { spacing } from '../../styles/base/spacing';

const styles = theme => ({
  projectPreview: {
    paddingBottom: spacing.space4,
  },
  heading: {
    display: 'inline',
  },
  delete: {
    float: 'right',
    paddingRight: '10px',
    fontSize: '20',
    position: 'absolute',
    left: '90%',
    color: 'black',
    top: '15px',
  }
})

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
      <Grid container
        // className={classes.inputsContainer}
        spacing={8}
      >
        {this.props.project.sections.map((section, i) =>
          <Grid item xs={6}>
            <SectionPreview
              key={i}
              section={section}
            />
          </Grid>
        )}
      </Grid>
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
    const { classes } = this.props;

    console.log(this.props);
    return (
      <Link to="/project">
        <div className={classes.projectPreview}
          onClick={this.handleClick.bind(this)}>
          <Card>
            <Card.Content>
              <h3 className={classes.heading}>
                {this.props.project.title}</h3>
              <span aria-hidden="true"
                className={classes.delete}
                onClick={this.deleteProject.bind(this)}>&times;</span>
            </Card.Content>

            <Card.Content>
              <div className='sections'>
                {this.props.project.sections.length !== 0 ? this.renderSections() : ''}
              </div>
            </Card.Content>
          </Card>
        </div>
      </Link>
    )
  }
}

export default withStyles(styles)(ProjectPreview);
