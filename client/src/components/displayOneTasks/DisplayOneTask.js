import React, { Component } from 'react'
import PropTypes from 'prop-types' //ES6


import './DisplayOneTask.css'

class DisplayOneTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false

    }
  }

  completeTask(e) {
    this.props.completeTask(this.props.task);
  }

  removeTask(e) {
    console.log(this.props.index);
    console.log(this.props.sectionId);
    this.props.removeTask(this.props.index, this.props.sectionId);
  }

  isHovering = () => {
    console.log(this.state.isHovering);
    this.setState({
      isHovering: !this.state.isHovering
    })
  }

  render() {
    return (
      <div className='DisplayOneTask'>
        <p
          onMouseEnter={this.isHovering.bind(this)}
          onMouseLeave={this.isHovering.bind(this)}
        >
          <span aria-hidden="true"
            onClick={this.completeTask.bind(this)}
            className={this.state.isHovering ? ' hovering' : ''}>✓</span>
          task: {this.props.task.title}
          <span aria-hidden="true"
            onClick={this.removeTask.bind(this)}
            className={this.state.isHovering ? ' hovering' : ''}>&times;</span></p>
      </div >
    )
  }
}

DisplayOneTask.propTypes = {

};

export default DisplayOneTask