import axios from "axios";

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

    return axios
      .get("/api/project")
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
  }

  static addProject(project) {}

  static deleteProject = (id, project) => {
    return axios
      .delete("api/project/deleted/" + id, {
        project: project
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  };
}

export default projectApi;
