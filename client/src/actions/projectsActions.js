import * as types from "./actionTypes";
import projectsApi from "../api/projectsApi";
import projectApi from "../api/projectsApi";

export function loadProjectsSuccess(projects) {
  return { type: types.LOAD_PROJECTS_SUCCESS, projects: projects };
}

export function addProjectSuccess(project) {
  return {
    type: types.ADD_PROJECT_SUCCESS,
    id: project.id,
    project: project
  };
}

export function deleteProjectSuccess(response, projectId) {
  return {
    type: types.DELETE_PROJECT_SUCCESS,
    id: projectId
  };
}

export function loadProjects() {
  return function(dispatch) {
    return projectsApi
      .getAllProjects()
      .then(projects => {
        dispatch(loadProjectsSuccess(projects.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function addProject(project) {
  return function(dispatch) {
    return projectsApi
      .addProject(project)
      .then(response => {
        dispatch(addProjectSuccess(response));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteProject(id, project) {
  return function(dispatch) {
    return projectApi
      .deleteProject(id, project)
      .then(response => {
        dispatch(deleteProjectSuccess(response, id));
      })
      .catch(error => {
        throw error;
      });
  };
}
