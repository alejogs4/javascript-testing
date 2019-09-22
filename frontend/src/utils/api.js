import axios from 'axios';

const tasks = axios.create({
  baseURL: 'http://localhost:3001/',
});

function getTasks() {
  return tasks.get('tasks').then((response) => response.data);
}

function getTaskById(id) {
  return tasks.get(`task/${id}`).then((response) => response.data);
}

function createTask(task) {
  return tasks.post('task', task).then((response) => response.data);
}

function deleteTask(id) {
  return tasks.delete(`task/${id}`).then((response) => response.data);
}

function updateTask(task) {
  return tasks.put('task', task).then((response) => response.data);
}

const api = {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
};

export default api;
