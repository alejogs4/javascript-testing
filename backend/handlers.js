const taskStorage = require('./storage');

module.exports = {
  getAll(_, res) {
    res.status(200).send({ tasks: taskStorage.get() })
  },
  getById(req, res) {
    const { id } = req.params
    const task = taskStorage.getById(id)

    if (!task) {
      return res.status(404).send({ message: `No existe la tarea con el id: ${id}` })
    }

    res.status(200).send({ task })
  },
  create(req, res) {
    const task = { ...req.body }

    if (!task.text || task.completed === undefined || task.completed === null) {
      return res.status(400).send({ message: 'Todos los campos de la tarea son obligatorios' });
    }

    task.id = taskStorage.defineTaskId()
    taskStorage.create(task)
    res.status(201).send({ task, message: 'Tarea existosamente creada' });
  },
  update(req, res) {
    const task = req.body;

    if (!task.id || !task.text || task.completed === undefined || task.completed === null) {
      return res.status(400).send({ message: 'Todos los campos de la tarea son obligatorios' });
    }

    const newTask = taskStorage.update(task);
    res.status(201).send({ task: newTask, message: 'Tarea existosamente actualizada' });
  },
  removeTask(req, res) {
    const { id } = req.params;
    const tasks = taskStorage.remove(id);
    res.status(200).send({ tasks, message: 'Tarea existosamente borrada' });
  },
};
