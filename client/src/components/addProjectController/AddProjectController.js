import React, { Component } from 'react'
import PropTypes from 'prop-types' //ES6


import './AddProjectController.css'
import AddProject from '../addProject/AddProject';

class AddProjectController extends Component {
    constructor(props){
        super(props) 
        this.state = {
        
        }
    }

    render(){
        return (
          <AddProject />
        )
    }
}

AddProjectController.propTypes = {

};

export default AddProjectController