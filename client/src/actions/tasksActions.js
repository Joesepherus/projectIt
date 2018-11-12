import * as types from "./actionTypes";
import tasksApi from "../api/tasksApi";

export function addTaskSuccess(task) {
  return {
    type: types.ADD_TASK_SUCCESS,
    id: task.id,
    task: task
  };
}

export function deleteTaskSuccess(response, taskId) {
  return {
    type: types.DELETE_TASK_SUCCESS,
    id: taskId
  };
}

export function addTask(task) {
  return function(dispatch) {
    return tasksApi
      .addTask(task)
      .then(response => {
        dispatch(addTaskSuccess(response));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteTask(id) {
  return function(dispatch) {
    return tasksApi
      .deleteTask(id)
      .then(response => {
        dispatch(deleteTaskSuccess(response, id));
      })
      .catch(error => {
        throw error;
      });
  };
}
