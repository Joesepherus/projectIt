import React from 'react'
import './CustomSnackbar.css'

import Snackbar from '@material-ui/core/Snackbar'

export default class CustomSnackbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vertical: 'bottom',
      horizontal: 'left'
    }
  }

  handleCloseSnackbar = () => {
    this.props.onClose()
  }

  render() {
    const { vertical, horizontal } = this.state
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={this.props.open}
        // onClose={this.handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{this.props.message}</span>}
        className={
          'custom-snackbar ' + this.props.classes ? this.props.classes : ''
        }
      />
    )
  }
}
