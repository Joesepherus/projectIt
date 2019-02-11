import React, { Component } from 'react'
import './DisplayOneTask.css'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { mdiCheck, mdiTrashCanOutline } from '@mdi/js'
import CustomIcon from '../basic/CustomIcon/CustomIcon'
import CustomInput from '../basic/input/index'

const styles = theme => ({
  text: {
    fontSize: 14,
    fontWeight: 200
  }
})

@inject('projectsStore')
@observer
class DisplayOneTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: { ...this.props.task },
      checkX: -50,
      checkY: -50,
      checkFull: false
    }
  }

  componentDidMount() {
    this.dragImg = new Image(0, 0)
    this.dragImg.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }

  completeTask = e => {
    const { projectsStore, section } = this.props
    let task = this.state.task

    if (task.completed_date !== '') {
      task.completed_date = ''
      task.state = 'inprogress'
    } else {
      task.completed_date = new Date()
      task.state = 'completed'
    }
    let promise = new Promise((resolve, reject) => {
      let response = projectsStore.updateTask(task, section)
      resolve(response)
    })
    promise.then(response => {})
  }

  handleChange = (type, value) => {
    let newTask = Object.assign({}, this.state.task)
    newTask[type] = value
    this.setState({
      task: newTask
    })
    // this.props.projectsStore.handleChange(type, e.target.value)
  }

  handleSubmit = e => {
    const { projectsStore, section } = this.props
    const task = Object.assign({}, this.state.task)
    console.log('task: ', task)

    if (task.title !== '') {
      let promise = new Promise((resolve, reject) => {
        resolve(projectsStore.updateTask(task, section))
      })
      promise.then(response => {
        projectsStore.getProjects()
      })
    }
  }

  deleteTask = e => {
    const { projectsStore, task, section } = this.props
    projectsStore.setDialog(true, 'delete', '', task, () =>
      projectsStore.deleteTask(task, section)
    )
    // projectsStore.deleteTask(task, section)
  }

  // isHovering = () => {
  //   console.log(this.state.isHovering);
  //   this.setState({
  //     isHovering: !this.state.isHovering
  //   })
  // }

  handleOnDragStart = e => {
    e.dataTransfer.setDragImage(this.dragImg, 0, 0)
    this.setState({
      startX: e.clientX
    })
  }

  onDrag = e => {
    let newCheckX = -50 + (e.clientX - this.state.startX)
    let newCheckY = -50 + (this.state.startX - e.clientX)
    if (newCheckX < -100) {
      newCheckX = -100
    }
    this.setState({
      checkX: newCheckX > 0 ? 0 : newCheckX,
      checkY: newCheckY > 0 ? 0 : newCheckY
    })
    e.dataTransfer.setData('text', e.target.id)
    // e.dataTransfer.setDragImage(img, 0, 0)
  }

  onDragEnd = e => {
    this.setState({
      checkFull: this.state.checkX >= 0 ? true : false
    })
    if (this.state.checkX >= 0) {
      this.completeTask()
    }
    if (this.state.checkY >= 0) {
      this.deleteTask()
    }
    let myVar = setInterval(() => {
      if (this.state.checkX <= -50 && this.state.checkY <= -50)
        clearInterval(myVar)
      if (this.state.checkX < -50) {
        this.setState({
          checkX: this.state.checkX + 1,
          checkY: this.state.checkY - 1
        })
      } else {
        this.setState({
          checkX: this.state.checkX - 1,
          checkY: this.state.checkY + 1
        })
      }
    }, 10)
  }

  // ===== DIALOG =====
  toggleDialog = (type, content, index) => {
    // console.log('toggleDialog index: ', index)

    // this.setState(prevState => {
    //   return {
    //     dialogStatus: !prevState.dialogStatus,
    //     dialogType: 'delete',
    //     dialogContent: content,
    //     index: index
    //   }
    // })

    this.props.projectsStore.setDialog(type, content, index)
  }

  handlePressedButton = e => {
    this.handleSubmit()
    console.log(
      'this.props.projectsStore.input: ',
      this.props.projectsStore.input
    )
    this.props.projectsStore.input[this.props.sectionId].focus()
    console.log('[this.props.sectionId]: ', this.props.sectionId)
  }

  render() {
    const { classes, projectsStore } = this.props

    return (
      <div
        style={{
          height: 29,
          marginBottom: 5
        }}
        draggable={true}
        onDragStart={e => this.handleOnDragStart(e)}
        onDragOver={e => this.onDrag(e)}
        onDragEnd={e => this.onDragEnd(e)}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'green',
            height: 29,
            width: 50,
            left: this.state.checkX
          }}
        >
          <span
            aria-hidden="true"
            onClick={this.completeTask.bind(this)}
            className={' hovering'}
            style={{ color: 'white' }}
          >
            <CustomIcon icon={mdiCheck} color="white" />
          </span>
        </div>
        <div
          className="DisplayOneTask"
          style={{
            position: 'absolute',
            height: 29,
            left: this.state.checkX + 100,
            cursor: 'pointer'
          }}
        >
          {this.state.task.completed_date !== ''}
          <CustomInput
            type="text"
            placeholder="title"
            value={this.state.task.title}
            change={value => this.handleChange('title', value)}
            onBlur={this.handleSubmit.bind(this)}
            onPressButton={this.handlePressedButton}
            disableUnderline
            styleInput={
              this.state.task.completed_date !== ''
                ? ['text greenColor completedText']
                : ['text blackColor']
            }
            InputProps={{
              disableUnderline: true,
              className:
                this.state.task.completed_date !== ''
                  ? ['text greenColor completedText']
                  : ['text blackColor']
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'red',
            height: 29,
            width: 50,
            right: this.state.checkY - 1
          }}
        >
          <CustomIcon icon={mdiTrashCanOutline} color="white" />
        </div>
      </div>
    )
  }
}

DisplayOneTask.propTypes = {}

export default withStyles(styles)(DisplayOneTask)
