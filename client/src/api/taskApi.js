import axios from 'axios';

class TaskApi {

	static createTask(task) {
		axios.post("/api/task/", {
			task
		})
			.then(function (response) {
				console.log(response);
			}).catch(function (error) {
				console.log(error);
			});
	}

}
export default TaskApi;