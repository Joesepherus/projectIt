import React, { Component } from 'react'
import './SectionPreview.css'

class SectionPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <div className="SectionPreview">{this.props.section.title}</div>
  }
}

export default SectionPreview
