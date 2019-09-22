import React from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ createTask, task, onHandleTaskChange }) => (
  <form className="tasks__form" onSubmit={createTask}>
    <input
      className="tasks__input"
      type="text"
      placeholder="Ingresa tu tarea"
      value={task}
      onChange={onHandleTaskChange}
    />
  </form>
);

TaskForm.propTypes = {
  createTask: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
  onHandleTaskChange: PropTypes.func.isRequired,
};

export default TaskForm;
