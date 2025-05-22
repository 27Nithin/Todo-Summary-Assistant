import React, { useState } from 'react';
import API from '../services/api';

export default function TodoForm({ onAdd }) {
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });

  const submit = async (e) => {
    e.preventDefault();
    await API.post('/todos', form);
    setForm({ title: '', description: '', dueDate: '' });
    onAdd(); // trigger refresh
  };

  return (
    <form onSubmit={submit}>
      <h3>Add Todo</h3>
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
      <button type="submit">Add</button>
    </form>
  );
}
