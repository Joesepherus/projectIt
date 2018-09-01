import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tasksReducer(state = initialState.tasks, action) {
	console.log(state);
	switch (action.type) {
		case types.ADD_TASK_SUCCESS: {
			let newTasks = Object.assign([], state.tasks);
			newTasks.push(action.task.data);
			return {
				tasks: newTasks
			}
		}
		case types.DELETE_TASK_SUCCESS: {
			const newTasks = Object.assign([], state.tasks);
			const indexOfTaskToDelete = state.tasks.findIndex(task => { return task.id == action.id })
			newTasks.splice(indexOfTaskToDelete, 1);
			return {
				tasks: newTasks,
			}
		}
		default:
			return state;
	}
}