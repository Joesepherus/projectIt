import React, { Component, PropTypes } from 'react'
import './AddTask.css'
import { Card, Input } from 'semantic-ui-react'

class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  handleSubmit(e) {
    // this.props.actions.addTask({ title: this.state.title, sectionId: this.props.section.id, id: this.props.section.tasks.length});
    this.props.addNewTask(this.state.title, this.props.section._id, this.props.section.tasks.length);
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  appropriateChange(callback, e) {
    return callback(e);
  }

  handleChange = (type, e) => {
    this.appropriateChange(type, e);
  }

  render() {
    console.log('ahoj');

    return (
      <div className='AddTask'>
        <Input
          type="text"
          name="title"
          placeholder="task"
          value={this.state.title}
          onChange={this.handleChange.bind(this, this.changeTitle)}
          onBlur={this.handleSubmit.bind(this)} />
      </div>
    )
  }
}

// function hobbiesForCheckBoxes(hobbies) {
//   return hobbies.map(hobby => {
//     hobby['checked'] = false;
//     return hobby;
//   });
// }


// function mapStateToProps(state, ownProps) {
//   let checkBoxHobbies = [];
//   if (state.hobbies.length > 0) {
//     checkBoxHobbies = hobbiesForCheckBoxes(Object.assign([], state.hobbies));
//   }

//   return {
//     checkBoxHobbies: checkBoxHobbies
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     addTask: task => dispatch(addTask(task))
//   };
// };

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(courseActions, dispatch)
//   };
// }


// export default connect(mapStateToProps, mapDispatchToProps)(AddTask);

// const ConnectedAddTask = connect(null, mapDispatchToProps)(AddTask);
// export default ConnectedAddTask;
export default AddTask;