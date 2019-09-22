module.exports = {
  tasks: [],
  get() {
    return this.tasks;
  },
  getById(id) {
    return this.tasks.find((task) => task.id === id);
  },
  create(task) {
    this.tasks.push(task);
    return task;
  },
  defineTaskId() {
    return this.tasks.length + 1;
  },
  update(task) {
    const index = this.tasks.findIndex((storedTask) => storedTask.id === task.id);
    this.tasks[index] = task;
    return task;
  },
  remove(id) {
    this.tasks = this.tasks.filter((task) => task.id !== Number(id));
    return this.tasks;
  },
  clean() {
    this.tasks = [];
    return this.tasks;
  },
};
