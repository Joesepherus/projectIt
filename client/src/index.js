import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route, Link } from 'react-router-dom';
import history from './history';
import { Provider } from "mobx-react";
import projectsStore from './stores/projectsStore';

const stores = {
  projectsStore,
};

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App
        history={history}
      />
    </Router>
  </Provider>,
  document.getElementById('root'));