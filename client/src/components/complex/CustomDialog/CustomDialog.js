// libraries
import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { inject } from 'mobx-react'

// style
import './CustomDialog.css'
// custom
import CustomText from '../../basic/CustomText/CustomText'
import CustomIcon from '../../basic/CustomIcon/CustomIcon'
import CustomTextField from '../../basic/CustomTextField/CustomTextField'
import CustomButton from '../../basic/CustomButton'

@inject('projectsStore')
class CustomDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open,
      scroll: 'paper',
      picture: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open !== prevState.open) {
      return {
        open: nextProps.open
      }
    }
    if (nextProps.index !== prevState.index) {
      return {
        index: nextProps.index
      }
    }
    return null
  }

  renderDialogHeader = () => {
    // let upperCaseType = ''
    // if (this.props.type) upperCaseType = this.props.type.toUpperCase()
    return (
      <DialogTitle id="scroll-dialog-title">
        {/* {this.props.translate.i18n.GLOBAL.DIALOG[upperCaseType]} */}
      </DialogTitle>
    )
  }

  // onChange = value => {
  //   const { type, index } = this.props;
  //   this.props.onChange(value, type, index);
  // };

  handleImage(e) {
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    let fileContent
    reader.onload = () => {
      fileContent = reader.result
      let slashIndex = fileContent.indexOf(',')

      fileContent = fileContent.slice(slashIndex + 1)

      this.setState({
        picture: fileContent
      })
    }
  }

  renderDialogContent = () => {
    const { type, content } = this.props

    switch (type) {
      case 'image':
      case 'background_image':
      case 'photo':
      case 'logo': {
        return (
          <DialogContent style={{ textAlign: 'center' }}>
            {this.state.picture ? (
              <div
                style={{
                  // borderRadius: '5px',
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
                  backgroundImage: `url(${'data:image/jpeg;base64,' +
                    this.state.picture}`,
                  width: '100%',
                  height: '100%',
                  minHeight: '200px',
                  maxWidth: '200px',
                  backgroundPosition: 'center',
                  /* Make the background image cover the area of the <div>, and clip the excess */
                  backgroundSize: 'cover',
                  borderRight: '0.5px solid #BFBFBF' // borderStyle: 'solid', borderRightWidth: 0.5, borderRightColor: gColors.greyLight,
                }}
                // className={classes.picture}
                onClick={() => this.imageUpload.click()}
              />
            ) : (
              <CustomIcon size={5} onClick={() => this.imageUpload.click()} />
            )}
            <input
              ref={ref => (this.imageUpload = ref)}
              type="file"
              style={{ display: 'none' }}
              onChange={e => this.handleImage(e)}
            />
          </DialogContent>
        )
      }
      case 'delete': {
        return (
          <DialogContent>
            <DialogContentText>
              <CustomText type="description">Delete item?</CustomText>
            </DialogContentText>
          </DialogContent>
        )
      }
      default: {
        return (
          <DialogContent>
            <DialogContentText>
              <CustomTextField
                multiline
                className="CustomDialog-TextArea"
                innerRef={ref => (this.dialogContentRef = ref)}
              >
                {content}
              </CustomTextField>
            </DialogContentText>
          </DialogContent>
        )
      }
    }
  }

  handleConfirm = () => {
    const { type, index } = this.props
    if (type === 'description') {
      let value = this.dialogContentRef.state.value
      this.props.onChange(value, type, index)
    }
    if (type === 'delete') {
      this.props.action()
    }
    // reset the image
    this.setState({
      picture: ''
    })
    this.props.projectsStore.setDialog(
      false,
      this.props.projectsStore.dialogData.type
    )
  }

  handleClose = () => {
    // reset the image
    this.setState({
      picture: ''
    })
    this.props.projectsStore.setDialog(
      false,
      this.props.projectsStore.dialogData.type
    )
  }

  renderDialogActions = () => {
    const { type } = this.props

    switch (type) {
      default:
        return (
          <DialogActions>
            <div className="actionBtnsContainer">
              <CustomButton
                type="text"
                onClick={this.handleClose}
                style={{ margin: '0px 10px' }}
              >
                NO
                {/* {translate.i18n.GLOBAL.DIALOG.CANCEL} */}
              </CustomButton>

              <CustomButton type="text" onClick={this.handleConfirm}>
                YES
                {/* {translate.i18n.GLOBAL.DIALOG.CONFIRM} */}
              </CustomButton>
            </div>
          </DialogActions>
        )
    }
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open ? this.props.open : false}
          onClose={() => this.handleClose()}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          classes={{
            paper: 'dialogPaper'
          }}
        >
          {this.renderDialogHeader()}
          {this.renderDialogContent()}
          {this.renderDialogActions()}
        </Dialog>
      </div>
    )
  }
}

export default CustomDialog
