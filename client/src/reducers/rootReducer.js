// src/reducers/rootReducer.js

import {combineReducers} from 'redux';  
import projects from './projectsReducer';


const rootReducer = combineReducers({  
  projects,
})

export default rootReducer;  