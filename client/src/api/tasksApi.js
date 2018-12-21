import axios from "axios";

class TaskApi {
  static createTask(task) {
    axios
      .post("/api/task/", {
        task
      })
      .then(function(response) {})
      .catch(function(error) {});
  }

  static deleteTask = id => {
    return axios
      .delete("api/task/deleted/" + id, {})
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  };
}
export default TaskApi;
