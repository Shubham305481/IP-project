import React from 'react';
import { useNavigate } from 'react-router-dom';
import PredictionForm from './PredictionForm';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>COVID-19 Test Dashboard</h2>
      <PredictionForm />
      <br />
      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>Logout</button>
    </div>
  );
};

export default Dashboard;
