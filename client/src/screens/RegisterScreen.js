import React, { Component } from 'react'
import axios from 'axios'
import { server_api, showToast, redirect } from '../global/global'
import CustomInput from '../components/basic/CustomInput/CustomInput'
import CustomButton from '../components/basic/CustomButton'
import CustomText from '../components/basic/CustomText/CustomText'
import './RegisterScreen.css'
import CustomHeader from '../components/basic/CustomHeader/CustomHeader'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  register = () => {
    let admin = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    this.props.store.register(admin, this.props.history)
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="layoutCenter">
        <CustomHeader style={{color: 'white'}} type="h1">Registrácia</CustomHeader>
        <div className="registerForm">
          <CustomInput
            placeholder="meno"
            value={this.state.name}
            name="name"
            onChange={this.onChange}
            className="registerInput"
          />
          <CustomInput
            placeholder="email"
            value={this.state.email}
            name="email"
            onChange={this.onChange}
            className="registerInput"
          />
          <CustomInput
            placeholder="heslo"
            value={this.state.password}
            name="password"
            onChange={this.onChange}
            className="registerInput"
            type="password"
          />
          <CustomButton onClick={this.register}>
            Registruj sa
          </CustomButton>
          <div>
            <Link to="/login"><CustomText type='tiny' style={{color: 'white'}}>Prihlás sa</CustomText></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(RegisterScreen))
