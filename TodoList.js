import React from 'react';
import API from '../services/api';

export default function TodoList({ todos, refresh }) {
  const toggleStatus = async (todo) => {
    const updated = { ...todo, status: todo.status === 'pending' ? 'completed' : 'pending' };
    await API.put(`/todos/${todo._id}`, updated);
    refresh();
  };

  const remove = async (id) => {
    await API.delete(`/todos/${id}`);
    refresh();
  };

  return (
    <div>
      <h3>Todo List</h3>
      {todos.length === 0 && <p>No todos yet.</p>}
      <ul>
        {todos.map(todo => (
          <li key={todo._id} style={{ marginBottom: '10px' }}>
            <strong>{todo.title}</strong> — {todo.status}
            <br />
            Due: {new Date(todo.dueDate).toLocaleDateString()}
            <br />
            <button onClick={() => toggleStatus(todo)}>
              Mark as {todo.status === 'pending' ? 'Completed' : 'Pending'}
            </button>
            <button onClick={() => remove(todo._id)} style={{ backgroundColor: '#dc3545' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
