import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.wrapper}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .btn:hover {
            background-color: #f1f1f1 !important;
            color: #0056b3 !important;
          }
        `}
      </style>

      <div style={styles.overlay}>
        <h1 style={styles.title}>COVID-19 Prediction System</h1>
        <p style={styles.subtitle}>
          Predict the likelihood of COVID-19 infection using Machine Learning. Sign up to get started and stay informed.
        </p>
        <div style={styles.buttonContainer}>
          <Link to="/signup" className="btn" style={styles.button}>Sign Up</Link>
          <Link to="/login" className="btn" style={styles.button}>Login</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: '1300px',
    height: '100vh',
    backgroundImage: 'url(https://images.unsplash.com/photo-1584036561566-baf8f5f1b144)', // Make sure the URL is correct
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensure it covers the full screen properly
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '2rem',
    borderRadius: '10px',
    color: 'white',
    textAlign: 'center',
    width: '90%',
    maxWidth: '600px',
    animation: 'fadeIn 2s ease-in-out',
    position: 'relative',
    zIndex: 1, // Ensure overlay is on top of the background image
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    color: '#007bff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '200px',
    transition: '0.3s ease',
  }
};

export default HomePage;
