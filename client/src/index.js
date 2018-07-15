import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route, Link } from 'react-router-dom';
import history from './history';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { loadProjects } from './actions/projectsActions';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App
        history={history}
        store={store}
      />
    </Router>
  </Provider>, document.getElementById('root'));

store.dispatch(loadProjects());
let state = store.getState();

console.log(state);