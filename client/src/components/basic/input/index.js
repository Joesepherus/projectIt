import React from 'react'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
// import { regexes } from '../../../functions/regexes'
import InputAdornment from '@material-ui/core/InputAdornment'
import './index.css'

class CustomInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || ''
    }
  }

  onChange = value => {
    this.setState(
      {
        value: value.target.value
      },
      () => {
        if (this.props.change) {
          this.props.change(this.state.value)
        }
      }
    )
  }

  setValue = value => {
    this.setState({
      value: value
    })
  }

  getValue = () => {
    return this.state.value
  }

  // getValid = regex => {
  //   let return_ = {
  //     success: false,
  //     data: null
  //   }
  //   return_.data = this.state.value
  //   if (regex === 'pass') {
  //     return_.success = !!this.state.value.match(regexes.password)
  //     return return_
  //     //return !!this.state.value.match(regexes.password);
  //   } else if (regex === 'email') {
  //     return_.success = !!this.state.value.match(regexes.email)
  //     return return_
  //     //return !!this.state.value.match(regexes.email);
  //   }
  // }

  // getValidateValue = regex => {
  //   if (regex === 'pass') {
  //     return !!this.state.value.match(regexes.password)
  //   } else if (regex === 'email') {
  //     return !!this.state.value.match(regexes.email)
  //   }
  // }

  handlePressedButton = e => {
    if (e.key === 'Enter') {
      this.props.onPressButton(this.state.value)
    }
  }

  onBlur = () => {
    this.props.onBlur(this.state.value)
  }

  onClick = () => {
    if (this.props.onClick) this.props.onClick()
  }

  render() {
    return (
      <FormControl className={'custom-input ' + this.props.className}>
        <InputLabel
          //htmlFor="custom-css-input"
          htmlFor={this.props.type}
          className={'input-label'}
        >
          {this.props.italic ? <i>{this.props.text}</i> : this.props.text}{' '}
          {this.props.required ? '*' : ''}
        </InputLabel>
        <Input
          value={this.state.value}
          type={this.props.type}
          //id="custom-css-input"
          id={this.props.id ? this.props.id : this.props.type}
          className={`input-input ${
            this.props.moreClasses ? this.props.moreClasses : ''
          }`}
          onChange={this.onChange}
          required={this.props.required ? this.props.required : false}
          onKeyPress={
            this.props.onPressButton ? this.handlePressedButton : void 0
          }
          autoFocus={this.props.autoFocus ? true : false}
          onBlur={this.props.onBlur ? this.onBlur.bind(this) : null}
          startAdornment={
            this.props.startAdornment ? (
              <InputAdornment position={this.props.startAdornment.position}>
                {this.props.startAdornment.value}
              </InputAdornment>
            ) : null
          }
          endAdornment={
            this.props.endAdornment ? (
              <InputAdornment position={this.props.endAdornment.position}>
                {this.props.endAdornment.value}
              </InputAdornment>
            ) : null
          }
          disableUnderline={this.props.disableUnderline}
          // placeholder={this.props.placeholder}
          classes={{
            // underline: classes.underline,
            // placeholder: "input-input",
            input: this.props.styleInput
            // inputBase: this.props.styleInput
          }}
          onClick={this.onClick}
        >
          {/* WHAT IS THIS? */}
          {/* = */}
          {/* <span>tsts</span>> */}
          {/* = */}
        </Input>
      </FormControl>
    )
  }
}

export default CustomInput
