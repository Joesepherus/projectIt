import React from 'react'

import { inject, observer } from 'mobx-react'

import './index.css'

import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

/**
 * CustomTabs component for rendering sub tabs inside a page
 * @prop {any} routerData holds router data: history, location and match
 */
@inject('internal')
@observer
export default class CustomTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: Number(this.props.routerData.match.params.tabIndex)
        ? Number(this.props.routerData.match.params.tabIndex)
        : 0,
      tabName: this.props.routerData.match.params.tabName,
      tabs: []
    }
  }

  componentDidMount() {
    this.setState({ tabs: this.props.tabsConfig })
    // console.log("\n\n\n\nCOMPONENT did mount", this.props.routerData.match)
    if (this.props.module === '/clients') {
      let tabs = this.props.tabsConfig
      for (let i = 0; i < tabs.length; i++) {
        let url = tabs[i].url.split('/')
        // console.log("TAB", url[url.length-1] === this.props.routerData.match.params.tabName)
        if (
          url[url.length - 1] === this.props.routerData.match.params.tabName
        ) {
          this.setState({ value: i })
          break
        }
      }
    } else if (this.props.module === '/privileges') {
      let tabs = this.props.tabsConfig
      for (let i = 0; i < tabs.length; i++) {
        let url = tabs[i].url.split('/')
        // console.log("TAB", url[url.length-1] === this.props.routerData.match.params.tabName)
        if (
          url[url.length - 1] === this.props.routerData.match.params.tabName
        ) {
          this.setState({ value: i })
          break
        }
      }
    } else if (this.props.module === '/settings') {
      let tabs = this.props.tabsConfig
      for (let i = 0; i < tabs.length; i++) {
        let url = tabs[i].url.split('/')
        // console.log("TAB", url[url.length-1] === this.props.routerData.match.params.tabName)
        if (
          url[url.length - 1] === this.props.routerData.match.params.tabName
        ) {
          this.setState({ value: i })
          break
        }
      }
    }
  }

  handleChange = (event, value) => {
    this.setState({ value: value }, () => {
      if (this.props.module === '/clients') {
        let idClient = this.props.routerData.match.params.idClient

        let tempHistory = this.props.routerData.history

        let newActiveTabUrlArr = this.state.tabs[this.state.value].url.split(
          '/'
        )
        let newActiveTab = newActiveTabUrlArr[newActiveTabUrlArr.length - 1]

        let newUrl = `/clients/${idClient}/${newActiveTab}`
        this.props.internal.setRoute(tempHistory, newUrl)
        this.props.internal.pushRoute(newUrl)
      } else if (this.props.module === '/privileges') {
        let tempHistory = this.props.routerData.history

        let newActiveTabUrlArr = this.state.tabs[this.state.value].url.split(
          '/'
        )
        let newActiveTab = newActiveTabUrlArr[newActiveTabUrlArr.length - 1]

        let newUrl = `/privileges/${newActiveTab}`
        this.props.internal.setRoute(tempHistory, newUrl)
        this.props.internal.pushRoute(newUrl)
      } else if (this.props.module === '/settings') {
        let tempHistory = this.props.routerData.history

        let newActiveTabUrlArr = this.state.tabs[this.state.value].url.split(
          '/'
        )
        let newActiveTab = newActiveTabUrlArr[newActiveTabUrlArr.length - 1]

        let newUrl = `/settings/${newActiveTab}`
        this.props.internal.setRoute(tempHistory, newUrl)
        this.props.internal.pushRoute(newUrl)
      } else {
        let pathWithNewTabIndex =
          this.props.routerData.location.pathname.slice(0, -1) +
          this.state.value
        let tempHistory = this.props.routerData.history
        tempHistory.location.pathname = pathWithNewTabIndex
        this.props.internal.setRoute(tempHistory, pathWithNewTabIndex)
        this.props.internal.pushRoute(pathWithNewTabIndex)
      }
    })
  }

  handleGoBack = () => {
    if (this.props.goBack) {
      this.props.internal.setRoute(
        this.props.routerData.history,
        this.props.goBack
      )
      this.props.internal.pushRoute(this.props.goBack)
    } else {
      this.props.internal.setRoute(
        this.props.routerData.history,
        this.props.module
      )
      this.props.internal.pushRoute(this.props.module)
    }
  }

  render() {
    let tabs = this.props.children.map((data, index) => {
      return data
    })

    return (
      <React.Fragment>
        <div className={'flex space-between'}>
          <div className={'subtitle'}>{this.props.title}</div>
          {this.props.goBackNone ? null : (
            <div className={'close'} onClick={this.handleGoBack}>
              <Icon path={mdiClose} size={1} />
            </div>
          )}
        </div>
        <Tabs
          scrollable
          scrollButtons="on"
          value={this.state.value}
          onChange={this.handleChange}
          className={'list-tabs'}
          classes={{
            indicator: 'orangeIndicator',
            scrollButtons: 'scrollButtons'
          }}
        >
          {this.props.tabsConfig.map((tab, index) => {
            return <Tab key={tab.label} label={tab.label} className={'tab'} />
          })}
        </Tabs>

        {tabs.map((data, index) => {
          if (this.state.value === index) {
            return data
          } else {
            return null
          }
        })}
      </React.Fragment>
    )
  }
}
