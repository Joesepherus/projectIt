import React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ClientsIcon from '@material-ui/icons/BusinessCenter'
import CategoriesIcon from '@material-ui/icons/DeviceHub'
import Collapse from '@material-ui/core/Collapse'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import StarBorder from '@material-ui/icons/StarBorder'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Divider from '@material-ui/core/Divider'

import Icon from '@mdi/react'
import { mdiViewDashboard } from '@mdi/js'

import './index.css'
import CustomText from '../CustomText/CustomText'

@inject('internal')
@inject('translate')
@observer
export default class CustomDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listCollapseOpen: []
    }
  }

  componentDidMount() {
    // this.setPermissions();
    this.setPermissions()
  }

  componentWillReceiveProps() {
    // if (toJS(this.props.internal.user.data.permissions) !== undefined) {
    // }
  }

  setPermissions() {
    console.log('setting perms')
    this.routes = [
      {
        title: this.props.translate.i18n.GLOBAL.MENU.DASHBOARD,
        link: '/',
        icon: <Icon path={mdiViewDashboard} size={1} />
      }
    ]
    //console.log("custom drawer permisions",require('mobx').toJS(this.props.internal.user.data.permissions))
    const permissions = toJS(this.props.internal.user.data.permissions)

    // if (permissions.administrators) {
    //   this.routes.push({
    //     title: this.props.translate.i18n.GLOBAL.MENU.ADMINISTRATORS,
    //     link: "/administrators",
    //     icon: <Icon path={mdiAccountMultiple} size={1} />
    //   });
    // }

    // if (permissions.administrators) {
    //   this.routes.push({
    //     title: this.props.translate.i18n.GLOBAL.MENU.MENU,
    //     link: "/menu",
    //     icon: <Icon path={mdiAccountMultiple} size={1} />
    //   });
    // }

    this.routes.push({
      title: this.props.translate.i18n.GLOBAL.MENU.CMS,
      icon: <ClientsIcon />,
      collapse: [
        {
          title: this.props.translate.i18n.GLOBAL.MENU.MENU,
          link: '/menu'
          // icon: <Icon path={mdiMenu} size={1} />
        },
        {
          title: this.props.translate.i18n.GLOBAL.MENU.KEY_FEATURES,
          link: '/key_features'
          // icon: <Icon path={mdiStarCircle} size={1} />
        },
        {
          title: this.props.translate.i18n.GLOBAL.MENU.HOW_TO_GET_STARTED,
          link: '/how_to_get_started'
          // icon: <Icon path={mdiPlay} size={1} />
        },
        {
          title: this.props.translate.i18n.GLOBAL.MENU.TESTIMONIALS,
          link: '/testimonials'
          // icon: <Icon path={mdiForum} size={1} />
        },
        {
          title: this.props.translate.i18n.GLOBAL.MENU.SERVICES,
          link: '/services'
          // icon: <Icon path={mdiCogs} size={1} />
        },
        {
          title: this.props.translate.i18n.GLOBAL.MENU.MEET_THE_TEAM,
          link: '/meet_the_team'
          // icon: <Icon path={mdiAccountGroup} size={1} />
        },
        {
          title: this.props.translate.i18n.GLOBAL.MENU
            .WHAT_ARE_YOU_INTERESTED_IN,
          link: '/what_are_you_interested_in'
          // icon: <Icon path={mdiHeart} size={1} />
        },
        {
          title: this.props.translate.i18n.GLOBAL.MENU.DOWNLOADS,
          link: '/downloads'
          // icon: <Icon path={mdiDownload} size={1} />
        },
        {
          title: this.props.translate.i18n.GLOBAL.MENU.PARTNERS,
          link: '/partners'
          // icon: <Icon path={mdiHumanGreeting} size={1} />
        },
        {
          title: this.props.translate.i18n.GLOBAL.MENU.OFFICES,
          link: '/offices'
          // icon: <Icon path={mdiHumanGreeting} size={1} />
        },
        {
          title: this.props.translate.i18n.GLOBAL.MENU.CLIENTS,
          link: '/clients'
          // icon: <Icon path={mdiHumanGreeting} size={1} />
        }
      ]
    })

    // if(permissions.products) {
    //     this.routes.push(
    //         {
    //             title: this.props.translate.i18n.GLOBAL.MENU.PRODUCTS,
    //             link:'/products',
    //             icon:<Icon path={mdiCart} size={1}  />,
    //         },
    //     )
    // }

    // if(permissions.lists_categories) {
    //     this.routes.push(
    //         {
    //             title: this.props.translate.i18n.GLOBAL.MENU.CATEGORIES,
    //             link:'/categories',
    //             icon:<CategoriesIcon/>,
    //         },
    //     )
    // }

    // if(permissions.lists_tags) {
    //     this.routes.push(
    //         {
    //             title: this.props.translate.i18n.GLOBAL.MENU.TAGS,
    //             link:'/tags',
    //             icon:<Icon path={mdiLabel} size={1}  />,
    //         },
    //     )
    // }
    // if(permissions.lists_delivery_types) {
    //     this.routes.push(
    //         {
    //             title: this.props.translate.i18n.GLOBAL.MENU.TRANSPORTS,
    //             link:'/transports',
    //             icon:<Icon path={mdiTruckDelivery} size={1}  />,
    //         },
    //     )
    // }

    // if(permissions.lists_payment_types) {
    //     this.routes.push(
    //         {
    //             title: this.props.translate.i18n.GLOBAL.MENU.PAYMENTS,
    //             link:'/payments',
    //             icon:<Icon path={mdiWallet} size={1}  />,
    //         },
    //     )
    // }

    // this.routes.push(
    //   {
    //     title: this.props.translate.i18n.GLOBAL.MENU.CONTACT,
    //     link: "/static/contact",
    //     icon: <Icon path={mdiContacts} size={1} />
    //   },
    //   {
    //     title: this.props.translate.i18n.GLOBAL.MENU.TERMS_OF_USE,
    //     link: "/static/terms-of-use",
    //     icon: <Icon path={mdiSecurity} size={1} />
    //   }
    // );
  }

  handleClickAway = () => {
    console.log('cliking awayyy')
    if (this.props.internal.drawerStatus) {
      this.props.internal.drawerSwitch()
    }
  }

  routes = []

  handleChangeModule = (data, index) => {
    if (data.collapse) {
      let newListCollapseOpen = { ...this.state.listCollapseOpen }
      if (newListCollapseOpen === undefined) newListCollapseOpen = true
      else newListCollapseOpen[index] = !newListCollapseOpen[index]
      this.setState({
        listCollapseOpen: newListCollapseOpen
      })
    } else {
      this.props.internal.pushRoute(data.link)
      // this.props.internal.changeUrl(data);
      //console.log(require('mobx').toJS(this.props.internal.data.url))
      // this.props.onClose();
      this.props.internal.drawerSwitch()
    }
  }

  render() {
    let activeMoudle = '/' + toJS(this.props.internal.route.link).split('/')[1]
    activeMoudle = activeMoudle.split('?')[0]
    console.log('activeMoudle: ', activeMoudle)
    return this.props.internal.drawerStatus ? (
      <Drawer
        variant="permanent"
        className={'drawer'}
        onClose={this.props.onClose}
        // onClose={this.handleClose}
      >
        <ClickAwayListener onClickAway={this.handleClickAway}>
          {/* ===== APP NAME ===== */}
          <div>
            <div className="CD_AppName">
              <CustomText type="heading" className="CD_AppName--heading">
                {this.props.translate.i18n.APP.APP_NAME}
              </CustomText>
              {/* <CustomText type="tiny" className="CD_AppName--tiny">
                {this.props.translate.i18n.APP.APP_TYPE}
              </CustomText> */}
            </div>

            <Divider />

            {/* ===== CD LIST ===== */}
            <List style={{ height: '100%' }} component="nav">
              {this.routes.map((data, i) => {
                console.log('data.collapse ', data.collapse)
                return (
                  <React.Fragment>
                    <ListItem
                      button
                      key={data.link}
                      onClick={() => this.handleChangeModule(data, i)}
                      className={
                        data.link === this.props.internal.route.link ||
                        data.link === activeMoudle
                          ? ' active'
                          : ''
                      }
                      // className="list"
                    >
                      <ListItemIcon>{data.icon}</ListItemIcon>
                      <ListItemText
                        primary={data.title}
                        className={'primary-text'}
                      />
                      {data.collapse !== undefined ? (
                        this.state.listCollapseOpen[i] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : null}
                    </ListItem>

                    {/* ===== COLLAPSE ===== */}
                    {data.collapse ? (
                      <Collapse
                        in={this.state.listCollapseOpen[i]}
                        timeout="auto"
                        unmountOnExit
                        timeout={500}
                      >
                        {data.collapse.map(list => {
                          return (
                            <List
                              component="div"
                              disablePadding
                              // className={
                              //   this.state.listCollapseOpen[i]
                              //     ? "nestedListFull"
                              //     : "nestedList"
                              // }
                            >
                              <ListItem
                                className={
                                  list.link ===
                                    this.props.internal.route.link ||
                                  list.link === activeMoudle
                                    ? 'nestedListItem active'
                                    : 'nestedListItem'
                                }
                                button
                                onClick={() => this.handleChangeModule(list, i)}
                              >
                                <ListItemIcon>{list.icon}</ListItemIcon>
                                <ListItemText
                                  inset
                                  classes={{
                                    primary: 'nestedListText'
                                  }}
                                  primary={list.title}
                                />
                              </ListItem>
                            </List>
                          )
                        })}
                      </Collapse>
                    ) : null}
                  </React.Fragment>
                )
              })}
            </List>
          </div>
        </ClickAwayListener>
      </Drawer>
    ) : null
  }
}
