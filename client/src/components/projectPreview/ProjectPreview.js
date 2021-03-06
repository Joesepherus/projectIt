import React, { Component } from 'react'
import './ProjectPreview.css'
import { Card } from 'semantic-ui-react'
import SectionPreview from '../SectionPreview/SectionPreview'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { spacing } from '../../styles/base/spacing'

const styles = theme => ({
  projectPreview: {
    paddingBottom: spacing.space4
  },
  heading: {
    display: 'inline'
  },
  delete: {
    float: 'right',
    paddingRight: '10px',
    fontSize: '20',
    position: 'absolute',
    left: '90%',
    color: 'black',
    top: '15px'
  }
})

@inject('projectsStore')
@inject('store')
@observer
class ProjectPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderSections() {
    return (
      <Grid
        container
        // className={classes.inputsContainer}
        spacing={8}
      >
        {this.props.project.sections.map((section, i) => (
          <Grid item xs={6}>
            <SectionPreview key={i} section={section} />
          </Grid>
        ))}
      </Grid>
    )
  }

  handleClick = (e) => {
    const { projectsStore } = this.props
    projectsStore.selectProject(this.props.project)
  }

  deleteProject(e) {
    e.preventDefault()
    const { projectsStore } = this.props
    let promise = new Promise((resolve, reject) => {
      resolve(projectsStore.deleteProject(this.props.project))
    })
    promise.then((response) => {
      projectsStore.getProjectsOfAdmin(this.props.store.admin._id)
    })
  }

  render() {
    const { classes, project } = this.props
    console.log('project: ', typeof project._id, project._id)

    return (
      <Link to={`/project/${project._id}`}>
        <div className={classes.projectPreview} onClick={this.handleClick.bind(this)}>
          <Card>
            <Card.Content>
              <h3 className={classes.heading}>{project.title}</h3>
              <span aria-hidden="true" className={classes.delete} onClick={this.deleteProject.bind(this)}>
                &times;
              </span>
            </Card.Content>

            <Card.Content>
              <div className="sections">{project.sections.length !== 0 ? this.renderSections() : ''}</div>
            </Card.Content>
          </Card>
        </div>
      </Link>
    )
  }
}

export default withStyles(styles)(ProjectPreview)
