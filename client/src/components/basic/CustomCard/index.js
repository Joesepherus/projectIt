import React from 'react'
import { toJS } from 'mobx'
import './index.css'

import CustomIconButton from '../customIconButton'

import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { inject, observer } from 'mobx-react'

import ListItem from '@material-ui/core/ListItem'

@inject('translate')
@inject('internal')
@observer
export default class CustomCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_primary: this.props.primary
    }
  }

  dropDownMenuItems = [
    {
      title: this.props.translate.i18n.GLOBAL.BUTTONS.DELETE,
      //url: "delete"
      action: 'delete'
    }
  ]

  handleChangePrimary = event => {
    this.setState({ is_primary: event.target.checked })
    this.props.changePrimaryStatus(this.props.id, event.target.checked)
  }

  render() {
    let permissions = toJS(
      this.props.internal.user.data.permissions.clients_admins
    )
    return (
      <Card className={'custom-card'}>
        {this.props.src ? (
          <Avatar src={this.props.src} />
        ) : (
          <Avatar aria-label="Recipe">R</Avatar>
        )}

        <div className={'representant-contact'}>
          <p>{this.props.username}</p>
          <span>
            <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
          </span>
          <span>
            <a href={`tel:${this.props.phone}`}>{this.props.phone}</a>
          </span>
          <ListItem
            dense
            onChange={this.handleChangePrimary}
            className={'list-item'}
          >
            <input
              id={`primary-${this.props.id}`}
              type="checkbox"
              value={`primary-${this.props.id}`}
              defaultChecked={this.state.is_primary}
            />
            <label htmlFor={`primary-${this.props.id}`}>
              {this.props.translate.i18n.MODULES.CLIENTS.IS_OZ_PRIMARY}
            </label>
          </ListItem>
        </div>
        {/* <IconButton className={'icon-btn'}>
                    <MoreVertIcon />
                </IconButton> */}
        <div className={'icon-btn'}>
          {permissions.update ? (
            <CustomIconButton
              id={this.props.id}
              label="More"
              dropdownMenu
              items={this.dropDownMenuItems}
              module={'/clients'}
            >
              <MoreVertIcon />
            </CustomIconButton>
          ) : null}
        </div>
      </Card>
    )
  }
}
