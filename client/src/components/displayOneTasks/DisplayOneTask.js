import React, { Component } from 'react'
import PropTypes from 'prop-types' //ES6


import './DisplayOneTask.css'

class DisplayOneTask extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className='DisplayOneTask'>
        <p>task: {this.props.task.description}</p>
      </div>
    )
  }
}

DisplayOneTask.propTypes = {

};

export default DisplayOneTask