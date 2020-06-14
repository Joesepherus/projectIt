import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import history from './history'
import { Provider } from 'mobx-react'
import projectsStore from './stores/projectsStore'
import store from './stores/store'
import CustomRouter from './Router'

const stores = {
  projectsStore,
  store,
}

ReactDOM.render(
  <Provider {...stores}>
    <CustomRouter />
  </Provider>,
  document.getElementById('root')
)
