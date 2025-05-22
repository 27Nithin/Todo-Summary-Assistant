import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form:', form); // Optional debug
      const response = await API.post('/auth/register', form);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error registering:', error.response.data.message);
      } else {
        console.error('Error registering:', error.message);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form,  email: e.target.value.trim() })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value.trim() })}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
