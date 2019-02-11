import React from 'react'

import Menu from '@material-ui/core/Menu'

import './index.css'

export default class CustomMenu extends React.Component {
  render() {
    return (
      <Menu
        id="menu"
        anchorEl={this.props.anchorEl}
        open={Boolean(this.props.open)}
        onClose={this.props.onClose}
      >
        {this.props.children}
      </Menu>
    )
  }
}
