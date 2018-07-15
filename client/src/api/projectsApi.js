import axios from 'axios';


class projectApi {
	static getAllProjects() {
		// let request = new Request('/api/project', {
		// 	method: 'GET',
		// });

		// return fetch(request).then(response => {
		// 	return response.json();
		// }).catch(error => {
		// 	return error;
		// });


		return axios.get("/api/project")
			.then(function (response) {
				console.log(response);
				return response;
			}).catch(function (error) {
				console.log(error);
				return error;
			});
	}

	static addProject(project) {
		return axios.post("/api/project", {
			title: project.title,
			description: project.description,
			id: project.id,
		})
			.then(function (response) {
				console.log(response);
				return response;
			}).catch(function (error) {
				console.log(error);
			});
	}

	static deleteProject = (id, project) => {
		return axios.delete('api/project/deleted/' + id, {
			project: project
		})
			.then(response => {
				console.log(response);
				return response;
			})
			.catch(error => {
				console.log(error);
				return error;
			});
	}
}

export default projectApi;  