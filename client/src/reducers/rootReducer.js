// src/reducers/rootReducer.js

import {combineReducers} from 'redux';  
import projects from './projectsReducer';
import tasks from './tasksReducer';


const rootReducer = combineReducers({  
  projects,
  tasks
})

export default rootReducer;  