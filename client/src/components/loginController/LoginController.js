import React, { Component } from 'react'
import PropTypes from 'prop-types' //ES6


import './LoginController.css'

class LoginController extends Component {
    constructor(props){
        super(props) 
        this.state = {
        
        }
    }

    render(){
        return (
            <div className='component-logincontroller'>
                <h1>LoginController</h1>
            </div>
        )
    }
}

LoginController.propTypes = {

};

export default LoginController