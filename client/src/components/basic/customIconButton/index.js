import React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import uuid from 'uuid4'

import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'

import CustomMenu from '../customMenu'
import MenuItem from '@material-ui/core/MenuItem'

import { ListItemText } from '@material-ui/core'

import './index.css'

import { api } from '../../../functions/api'

@inject('internal')
@inject('translate')
@observer
export default class CustomIconButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      openDeleteDialog: false
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  setReadNotification = async id => {
    let set_data = await api({
      method: 'patch',
      url: `user/notifications/${id}/read`,
      authorization: this.props.internal.user.access_token
    })

    // console.log("\n\n\n\nSET NOTIFICATION AS READ", set_data)
    if (set_data.success) {
      this.getUserData()
    }
  }

  getUserData = async () => {
    let load_data = await api({
      method: 'get',
      url: 'user',
      authorization: this.props.internal.user.access_token
    })

    if (load_data.success === true) {
      localStorage.setItem('user', JSON.stringify(load_data.data))
      this.props.internal.loginUser(load_data.data, true)
    }
  }

  handleChangeModule = data => {
    this.setState({ anchorEl: null })
    if (this.props.module) {
      let moduleAndId = this.props.module ? this.props.module : ''
      moduleAndId = moduleAndId + '/' + this.props.id + '/'

      // console.log("module and id", moduleAndId)

      // console.log("\n\n\n URL: \n\n\n", data)
      let currentModule = this.props.module.replace('/', '')
      let deleteData = {
        module: currentModule,
        id: this.props.id
      }

      // this.props.internal.pushRoute(url)

      if (data.action === 'delete') {
        //this.setState({openDeleteDialog: true, anchorEl: null})
        this.setState({ anchorEl: null })
        this.props.internal.setActionDelete()
        this.props.internal.setActionDeleteObj(deleteData)
      } else if (data.action === 'download') {
        // console.log("DOWNLOAD DATA url", this.props.data.url);
        window.open(this.props.data.url, '_blank')
      } else if (data.action === 'edit') {
        // console.log("EDIT", this.props.id)
        this.setState({ anchorEl: null })
        let data = {
          edit: true,
          id: this.props.id
        }
        this.props.internal.setActionEdit(data)
      } else if (data.action === 'detail') {
        if (this.props.production) {
          this.props.internal.pushRoute(moduleAndId + data.action)
        } else {
          this.props.internal.setSnackbar(
            this.props.translate.i18n.MODULES.CLIENTS.PRODUCT_UNAVAILABLE,
            true
          )
        }
      } else if (data.action === 'detail_order') {
        // console.log("\n\n\nDETAIL PREVIEW", this.props.id, link)
        this.setState({ anchorEl: null })
        let data = {
          edit: true,
          id: this.props.id
        }
        this.props.internal.setActionEdit(data)
        this.props.internal.pushRoute(
          toJS(this.props.internal.route.link) + `/${this.props.id}`
        )
      } else if (data.action === 'edit_weight') {
        this.setState({ anchorEl: null })
        let data = {
          edit: true,
          id: this.props.id
        }
        this.props.internal.setActionEdit2(data)
      } else if (
        data.url2 &&
        this.props.id !== Number(toJS(this.props.internal.user.data.id))
      ) {
        this.props.internal.pushRoute(moduleAndId + data.url2)
      } else if (data.action === 'privileges') {
        if (this.props.internal.drawerStatus === true)
          this.props.internal.drawerSwitch()
        this.setState({ anchorEl: null })
        this.props.internal.pushRoute('privileges/admin' + `/${this.props.id}`)
      } else if (data.action === 'menu') {
        if (this.props.internal.drawerStatus === true)
          this.props.internal.drawerSwitch()

        let tableData = this.props.internal.dataForTable
        console.log('tableData: ', tableData)
        console.log(' this.props.id: ', this.props.id)
        let currentPageContent = tableData.data.find(el => {
          return el.id === this.props.id
        })
        console.log('currentPageContent: ', currentPageContent)
        this.props.internal.setPageContentEditProps(currentPageContent)
        console.log('data.url: ', data.url)
        this.props.internal.pushRoute(data.url + `/${this.props.id}`)
      } else {
        this.props.internal.pushRoute(moduleAndId + data.url)
      }
    } else {
      if (data.action === 'notifications') {
        // console.log("\n\n\nnotifications", this.props)
        this.setState({ anchorEl: null })
        let dataEditDialog = {
          edit: true,
          id: this.props.id
        }
        this.props.internal.setActionEdit(dataEditDialog)
        this.props.internal.pushRoute(data.url)
        this.setReadNotification(toJS(data.notification_id))
      }
      this.props.internal.pushRoute('/')
      this.props.internal.pushRoute(data.url)
    }

    if (data.action === undefined) {
      if (this.props.internal.drawerStatus === true)
        this.props.internal.drawerSwitch()
    }
  }

  // handleCloseDeleteDialog = () => {
  //     this.setState({openDeleteDialog: false})
  // }

  render() {
    return (
      <div className={'custom-btn'}>
        {/* <DeleteDialog open={this.state.openDeleteDialog} close={this.handleCloseDeleteDialog}/> */}
        {this.props.dropdownMenu ? (
          <CustomMenu
            anchorEl={this.state.anchorEl}
            open={this.state.anchorEl}
            onClose={this.handleClose}
            className={
              'cusomMenu' + this.props.notifications ? ' notifications' : ''
            }
          >
            {this.props.items.map((data, index) => {
              return (
                <MenuItem
                  key={uuid()}
                  onClick={() => this.handleChangeModule(data)}
                  disabled={data.disabled}
                  className={data.readed ? `readed-${data.readed}` : ''}
                >
                  {this.props.notifications ? (
                    <ListItemText
                      primary={data.title}
                      secondary={data.created_at}
                      className={'notification-item'}
                    />
                  ) : (
                    data.title
                  )}
                </MenuItem>
              )
            })}
          </CustomMenu>
        ) : null}

        {this.props.showBadge ? (
          <Badge
            badgeContent={this.props.numberOfNotifications}
            className={'badge'}
          >
            <IconButton
              aria-label={this.props.label}
              onClick={this.handleClick}
              aria-owns={this.state.anchorEl ? 'menu' : null}
              aria-haspopup="true"
            >
              {this.props.children}
            </IconButton>
          </Badge>
        ) : (
          <IconButton
            aria-label={this.props.label}
            onClick={this.handleClick}
            aria-owns={this.state.anchorEl ? 'menu' : null}
            aria-haspopup="true"
          >
            {this.props.children}
          </IconButton>
        )}
      </div>
    )
  }
}
