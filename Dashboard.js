import React, { useEffect, useState } from 'react';
import API from '../services/api';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Navbar from '../components/Navbar';
import '../styles/App.css'; // Import CSS for styling

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [summary, setSummary] = useState({});

  const load = async () => {
    const [todoRes, sumRes] = await Promise.all([
      API.get('/todos'),
      API.get('/todos/summary')
    ]);
    setTodos(todoRes.data);
    setSummary(sumRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="summary">
          <p>Total: {summary.total}</p>
          <p>Pending: {summary.pending}</p>
          <p>Completed: {summary.completed}</p>
          <p>Overdue: {summary.overdue}</p>
        </div>

        <TodoForm onAdd={load} />
        <div className="todo-container">
          <TodoList todos={todos} refresh={load} />
        </div>
      </div>
    </div>
  );
}
