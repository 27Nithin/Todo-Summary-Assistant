import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div><strong>Todo Assistant</strong></div>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
      </div>
    </div>
  );
}
