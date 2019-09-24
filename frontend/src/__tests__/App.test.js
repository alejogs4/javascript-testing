import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import api from '../utils/api';

jest.mock('../utils/api');

const wait = () => new Promise((r) => setTimeout(r, 0));
describe('Tests para el componente App de la aplicacion', () => {
  it('Deberia realizar de manera normal las acciones de crear, marcar y eliminar tareas', async () => {
    const task = {
      id: 1,
      text: 'Prueba 2',
      completed: false,
    };

    api.getTasks.mockResolvedValue({ tasks: [] });
    api.createTask.mockResolvedValue({ task });
    api.updateTask.mockResolvedValue({ task: { ...task, completed: true } });
    api.deleteTask.mockResolvedValue({ tasks: [] });

    const wrapper = mount(<App />);
    await wait();
    expect(wrapper.state('tasks')).toEqual([]);

    const form = wrapper.find('[data-test="task-form"]');
    const input = form.find('[data-test="task-input"]');

    input.simulate('change', { target: { value: 'Tarea 2' } });
    expect(input.render().attr('value')).toBe('Tarea 2');
    expect(wrapper.state('task')).toBe('Tarea 2');

    form.simulate('submit', { preventDefault: jest.fn() });
    await wait();
    expect(wrapper.state('tasks')).toEqual([task]);
    wrapper.update();

    const checkbox = wrapper.find(`[data-test="task-check-${task.id}"]`);
    checkbox.simulate('click', { target: { checked: true } });
    await wait();
    expect(wrapper.state('tasks')).toEqual([{ ...task, completed: true }]);

    const deleteButton = wrapper.find(`[data-test="task-button-${task.id}"]`);
    deleteButton.simulate('click');
    await wait();
    expect(wrapper.state('tasks')).toEqual([]);
  });
});
