import React, { Component } from 'react'
import './CustomText.css'
import { StyleSheet, css } from 'aphrodite'
import { GCOLORS } from '../../../global'

class CustomText extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <p
        className={
          css(styles[this.props.type], styles[this.props.modified]) +
          ' ' +
          this.props.className
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </p>
    )
  }
}

export default CustomText

const styles = StyleSheet.create({
  title: {
    color: GCOLORS.black,
    fontSize: 24,
    fontWeight: '400'
  },
  heading: {
    color: GCOLORS.gray,
    fontSize: 18,
    fontWeight: '400'
  },
  subHeading: {
    color: GCOLORS.gray,
    fontSize: 16,
    fontWeight: '300'
  },
  description: {
    color: GCOLORS.gray,
    fontSize: '1rem',
    fontWeight: '300'
    // maxWidth: "70%"
  },
  tiny: {
    fontSize: 12,
    fontWeight: '300',
    opacity: 1
  },
  link: {
    fontSize: 10,
    fontWeight: '300',
    opacity: 1,
    color: GCOLORS.blue
  },
  cursive: {
    fontStyle: 'italic'
  }
})
