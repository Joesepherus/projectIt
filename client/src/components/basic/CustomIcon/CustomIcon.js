import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiAccountCircle } from '@mdi/js'
import './CustomIcon.css'

class CustomIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onClick = () => {
    if (this.props.onClick) this.props.onClick()
  }

  render() {
    return (
      <div>
        <Icon
          path={this.props.icon ? this.props.icon : mdiAccountCircle}
          size={this.props.size ? this.props.size : 1}
          color={this.props.color ? this.props.color : 'black'}
          className={
            this.props.className ? this.props.className : '' + ' CustomIcon'
          }
          onClick={this.onClick}
        />
      </div>
    )
  }
}

export default CustomIcon
