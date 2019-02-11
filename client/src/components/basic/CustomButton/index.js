import React from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import './index.css'

export default class CustomButton extends React.Component {
  handlePressedButton = e => {
    if (e.key === 'Enter') {
      // console.log("Pressed enter")
      this.props.onClick()
    }
  }

  renderClassName = () => {
    const { type } = this.props
    switch (type) {
      case 'contained': {
        return 'Custom_Button contained '
      }
      case 'outlined': {
        return 'Custom_Button outlined '
      }
      case 'text': {
        return 'Custom_Button text '
      }
      case 'fab': {
        return 'Custom_Button fab '
      }
      default: {
        return 'Custom_Button '
      }
    }
  }

  render() {
    return (
      <Button
        disabled={this.props.progressBar || this.props.disabled}
        className={
          this.renderClassName() +
          this.props.className +
          ' ' +
          this.props.mystyle +
          ' ' +
          (this.props.progressBar ? 'disabled' : '') +
          (this.props.justText ? ' justText' : '')
        }
        variant="contained"
        style={this.props.style}
        onClick={this.props.onClick}
        type={this.props.submit ? 'submit' : 'button'}
        onKeyPress={this.props.pressButton ? this.handlePressedButton : void 0}
        classes={{
          disabled: 'disabled'
        }}
      >
        {this.props.children}

        {this.props.progressBar ? (
          <div>
            {!this.props.progressBar ? <span>{this.props.title}</span> : null}
            <CircularProgress size={18} className={'progressbar'} />
          </div>
        ) : (
          <span className={this.props.justText ? '' : 'button-title'}>
            {this.props.title}
          </span>
        )}
      </Button>
    )
  }
}
