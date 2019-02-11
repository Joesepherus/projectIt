// core
import React, { Component } from 'react'
// mui
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import './CustomSwitch.css'

class CustomSwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedA: true
    }
  }

  handleChange = event => {
    // this.setState({ [name]: event.target.checked });
    if (this.props.onChange) this.props.onChange(event)
  }

  render() {
    return (
      <FormControlLabel
        control={
          <Switch
            checked={this.props.value}
            value="checkedA"
            onChange={this.handleChange}
            color="primary"
            disabled={this.props.disabled}
            className={this.props.className}
            classes={{
              switchBase: 'switchBase',
              checked: 'checked',
              bar: 'switch-bar'
            }}
          />
        }
        style={{ marginLeft: '0px' }}
        labelPlacement="start"
        classes={{
          label: 'CS_label'
        }}
        label={this.props.label}
      />
    )
  }
}

export default CustomSwitch
