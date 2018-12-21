import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function projectsReducer(state = initialState.projects, action) {
  switch (action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
      return {
        projects: action.projects
      };
    case types.ADD_PROJECT_SUCCESS: {
      let newProjects = Object.assign([], state.projects);
      newProjects.push(action.project.data);
      return {
        projects: newProjects
      };
    }
    case types.DELETE_PROJECT_SUCCESS: {
      const newProjects = Object.assign([], state.projects);
      const indexOfFileToDelete = state.projects.findIndex(project => {
        return project.id == action.id;
      });
      newProjects.splice(indexOfFileToDelete, 1);
      return {
        projects: newProjects
      };
    }
    default:
      return state;
  }
}
