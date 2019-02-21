import React, { Component } from 'react'
import PropTypes from 'prop-types' //ES6
import GoogleLogin from 'react-google-login'

const responseGoogle = response => {
  console.log(response)
}

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="823888985979-lve4aompct6g9k4eu2r401anbb4bj87i.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    )
  }
}
