import React, { Component } from 'react'
import CustomInput from '../components/basic/CustomInput/CustomInput'
import CustomButton from '../components/basic/CustomButton'
import CustomText from '../components/basic/CustomText/CustomText'
import './RegisterScreen.css'
import CustomHeader from '../components/basic/CustomHeader/CustomHeader'
import { observer, inject } from 'mobx-react'
import { redirect } from '../global/global'
import { Link } from 'react-router-dom'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  login = async () => {
    let res = await this.props.store.login(
      this.state.email,
      this.state.password
    )
      console.log('res: ', res);
    // if (res !== null) redirect('/', this.props.history)
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="layoutCenter">
        <CustomHeader type="h1" style={{color: 'white'}}>Prihlásenie</CustomHeader>
        <div className="registerForm">
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
          <CustomButton onClick={this.login} color="blue">
            Prihlásiť sa
          </CustomButton>
          <div>
            <Link to="/register"><CustomText type="tiny" style={{color: 'white'}}>Registruj sa</CustomText></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(LoginScreen))
