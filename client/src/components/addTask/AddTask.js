import React, { Component } from 'react'
import './AddTask.css'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  text: {
    fontSize: 14,
    fontWeight: 200
  }
})

@inject('projectsStore')
@inject('store')
@observer
class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  componentWillUnmount() {
    const { projectsStore } = this.props
    projectsStore.resetInputs()
  }

  handleChange = (type) => (e) => {
    this.setState({
      [type]: e.target.value
    })
  }

  resetInputs = (...inputs) => {
    inputs.map((input) => {
      this.setState({
        [input]: ''
      })
      return ''
    })
  }

  handleSubmit(e) {
    const { projectsStore, section } = this.props
    let task = this.state

    if (this.state.title !== '') {
      task.create_date = new Date()
      task.completed_date = ''
      task.state = 'inprogress'
      projectsStore.addTask(section, task)
    }
    this.resetInputs('title')
  }

  componentDidMount() {
    this.props.projectsStore.setInput(this.input, this.props.index)
  }

  handlePressedButton = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className="AddTask">
        <TextField
          type="text"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleChange('title')}
          onBlur={this.handleSubmit.bind(this)}
          className={classes.textField}
          inputRef={(input) => (this.input = input)}
          onKeyPress={this.handlePressedButton}
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.text
            }
          }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(AddTask)
