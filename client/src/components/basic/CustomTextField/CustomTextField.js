// core
import React, { Component } from 'react'
// libraries
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
// custom
import TextField from '@material-ui/core/TextField'
// style
import './CustomTextField.css'

const styles = () => ({
  underline: {
    '&:after': {
      borderBottomColor: '#26c6da!important'
    }
  }
})

const theme = createMuiTheme({
  palette: {
    primary: { main: 'rgb(38, 198, 218)' }
  }
})

class CustomTextField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.children
    }
  }

  onChange = event => {
    this.setState({
      value: event.target.value
    })
    if (this.props.onChange) this.props.onChange(event.target.value)
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <TextField
          id="standard-bare"
          // inputProps={this.props.inputProps}
          className={'input-label ' + this.props.className}
          placeholder={this.props.placeholder}
          multiline={this.props.multiline}
          onChange={this.onChange}
          // defaultValue={this.state.seoDescription}
          // rows="7"
          InputProps={{
            classes: {
              input: 'input-label'
              //  placeholder: "input-label"
            }
          }}
          classes={
            {
              // underline: classes.underline,
              // placeholder: "input-label"
            }
          }
          value={this.state.value}
        />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(CustomTextField)
