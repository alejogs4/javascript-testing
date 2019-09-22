/* eslint-disable no-console */
import React, { Component } from 'react';
import api from './utils/api';
import TasksList from './Components/TasksList';
import TaskForm from './Components/TaskForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      task: '',
    };

    this.createTask = this.createTask.bind(this);
    this.onHandleTaskChange = this.onHandleTaskChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleCompletedState = this.toggleCompletedState.bind(this);
  }

  componentDidMount() {
    api.getTasks()
      .then((response) => {
        this.setState({ tasks: response.tasks });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  onHandleTaskChange(e) {
    this.setState({ task: e.target.value });
  }

  createTask(e) {
    e.preventDefault();
    const { task } = this.state;

    const taskInfo = {
      text: task,
      completed: false,
    };

    api.createTask(taskInfo)
      .then((response) => {
        this.setState((prev) => ({
          tasks: [response.task, ...prev.tasks],
          task: '',
        }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  toggleCompletedState(task) {
    return (e) => {
      const taskInfo = {
        ...task,
        completed: e.target.checked,
      };

      api.updateTask(taskInfo)
        .then((response) => {
          this.setState((prev) => {
            const newTasks = [...prev.tasks];
            const taskIndex = newTasks.findIndex((task) => task.id === response.task.id);
            newTasks[taskIndex] = response.task;

            return {
              tasks: newTasks,
            };
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
  }

  deleteTask(task) {
    return () => {
      api.deleteTask(task.id)
        .then((response) => {
          this.setState({ tasks: response.tasks });
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
  }

  render() {
    const { tasks, task } = this.state;

    return (
      <>
        <header className="main-header">
          <h1>TodoList</h1>
        </header>
        <main className="tasks">
          <div className="main-container">
            <TaskForm
              task={task}
              onHandleTaskChange={this.onHandleTaskChange}
              createTask={this.createTask}
            />
            <TasksList
              tasks={tasks}
              toggleCompletedState={this.toggleCompletedState}
              deleteTask={this.deleteTask}
            />
          </div>
        </main>
      </>
    );
  }
}

export default App;
