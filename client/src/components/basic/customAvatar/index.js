import React from 'react'
import './index.css'
import Avatar from '@material-ui/core/Avatar'
import { inject } from 'mobx-react'

import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

@inject('translate')
@inject('internal')
export default class CustomAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null
    }
  }

  file = null

  fileChangedHandler = event => {
    // console.log("fileChangedHandler", event.target.files[0])
    this.file = event.target.files[0]
    this.setState({ selectedFile: event.target.files[0] })
    this.props.internal.photoWasChanged(true)
  }

  uploadPhoto = () => {
    // console.log("uploadPhoto")
    this.props.actionUploadPhoto(this.state.selectedFile)
    //this.setState({selectedFile: null})
    this.props.internal.photoWasChanged(false)
  }

  handleDiscardImage = () => {
    this.setState({ selectedFile: null })
    this.props.internal.photoWasChanged(false)
  }

  render() {
    //console.log("EDIT IMAGE", this.props.disableEdit)
    return (
      <div className={'image'}>
        <Avatar
          alt="avatar"
          src={
            this.state.selectedFile
              ? URL.createObjectURL(this.state.selectedFile)
              : this.props.src
          }
        />
        {this.props.internal.successUpdatePhoto ? (
          <span className={'btn-discard-img'}>
            <Icon path={mdiClose} size={1} onClick={this.handleDiscardImage} />
          </span>
        ) : null}
        {this.props.disableEdit ? null : (
          <div className={'image-overlay'}>
            {this.props.internal.successUpdatePhoto ? (
              <div>
                <span onClick={this.uploadPhoto}>
                  {this.props.translate.i18n.GLOBAL.BUTTONS.SAVE}
                </span>
              </div>
            ) : (
              <div>
                <label htmlFor="image_upload">
                  {this.props.translate.i18n.GLOBAL.BUTTONS.CHANGE}
                </label>
                <input
                  type="file"
                  id="image_upload"
                  onChange={this.fileChangedHandler}
                  disabled={this.props.disableEdit}
                  accept="image/jpg, image/jpeg, image/png"
                />
              </div>
            )}
          </div>
        )}

        {/* {this.state.selectedFile ? 
                    <span className={'btn-discard-img'} ><Icon path={mdiClose} size={1} onClick={this.handleDiscardImage}/></span>
                    : 
                    null
                }
                <div className={'image-overlay'}>
                {this.state.selectedFile ? 
                    <div>
                        
                        <span onClick={this.uploadPhoto}>{this.props.translate.i18n.GLOBAL.BUTTONS.SAVE}</span>
                    </div>
                    
                :
                    <div>
                        <label htmlFor="image_upload" >{this.props.translate.i18n.GLOBAL.BUTTONS.CHANGE}</label>
                        <input 
                            type="file" 
                            id="image_upload" 
                            onChange={this.fileChangedHandler} 
                            disabled={this.props.disableEdit}/>
                    </div>
                } 
                    
                </div>*/}
      </div>
    )
  }
}
