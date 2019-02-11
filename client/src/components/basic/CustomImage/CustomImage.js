import React, { Component } from 'react'
import './CustomImage.css'
import placeholderImage from '../../../assets/image/placeholderImage.jpeg'

class CustomImage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="CustomImage">
        <img style={{ width: '25px', height: '25px' }} src={placeholderImage} />
      </div>
    )
  }
}

export default CustomImage
