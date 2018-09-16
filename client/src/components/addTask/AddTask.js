import React, { Component, PropTypes } from 'react'
import './AddTask.css'
import { Card, Input } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { spacing } from '../../styles/base/spacing';

const styles = theme => ({
  text: {
    fontSize: 14,
    fontWeight: 200,
  },
})

@inject('projectsStore')
@observer
class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  componentWillUnmount() {
    const { projectsStore } = this.props;
    projectsStore.resetInputs();
  }

  handleChange = type => e => {
    this.setState({
      [type]: e.target.value
    })
  }

  resetInputs = (...inputs) => {
    inputs.map((input) =>{
      this.setState({
        [input]: ''
      })
    })
  }

  handleSubmit(e) {
    const { projectsStore, section } = this.props;
    let task = this.state;

    if (this.state.title !== '') {
      task.create_date = new Date();
      task.completed_date = '';
      task.state = 'inprogress'
      projectsStore.addTask(section, task);
    }
    this.resetInputs('title');
  }

  render() {
    const { projectsStore, classes } = this.props;

    return (
      <div className='AddTask'>
        <TextField
          type='text'
          placeholder='title'
          value={this.state.title}
          onChange={this.handleChange('title')}
          onBlur={this.handleSubmit.bind(this)}
          className={classes.textField}
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.text,
            },
          }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(AddTask);