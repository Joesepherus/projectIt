import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ErrorScreen from './screens/ErrorScreen'
import { observer, inject } from 'mobx-react'
import CustomToast from './components/basic/CustomToast/CustomToast'
// import ScreensContainer from './components/containers/ScreensContainer/ScreensContainer'
import history from './history'
import App from './App'
import './Router.css'

class CustomRouter extends Component {
  async componentDidMount() {
    if (this.isLogged()) {
      await this.props.store.getAdmin(localStorage.getItem('id'))
      // this.props.store.setLoggedIn(true)
    }
  }

  isLogged() {
    return localStorage.getItem('logged') === 'true'
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          {this.props.store.loggedIn ? (
            <App />
          ) : (
            <Switch>
              <Route exact path="/" component={LoginScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="*" component={ErrorScreen} />
            </Switch>
          )}
        </Router>
        <CustomToast />
      </div>
    )
  }
}

export default inject('store')(observer(CustomRouter))
