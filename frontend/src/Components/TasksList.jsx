import React from 'react';
import PropTypes from 'prop-types';

const TasksList = ({ tasks, toggleCompletedState, deleteTask }) => (
  <ul className="tasks__list">
    {tasks.map((task) => (
      <li
        className={`tasks__item ${task.completed && 'tasks__item--completed'}`}
        key={task.id}
        data-test={`task-${task.id}`}
      >
        <p>{task.text}</p>
        <input type="checkbox" onClick={toggleCompletedState(task)} checked={task.completed} />
        <button type="button" onClick={deleteTask(task)}>x</button>
      </li>
    ))}
  </ul>
);

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(Object).isRequired,
  toggleCompletedState: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TasksList;