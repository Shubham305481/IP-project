import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = existingUsers.find(user => user.email === email && user.password === password);

    if (matchedUser) {
      toast.success('Login successful! Redirecting...');
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } else {
      toast.error('Invalid email or password. Please try again or sign up.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.heading}>Login</h2>
          <input
            style={styles.input}
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            onFocus={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#000'; }}
            onBlur={(e) => { e.target.style.backgroundColor = styles.input.backgroundColor; e.target.style.color = styles.input.color; }}
          />
          <input
            style={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            onFocus={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#000'; }}
            onBlur={(e) => { e.target.style.backgroundColor = styles.input.backgroundColor; e.target.style.color = styles.input.color; }}
          />
          <button type="submit" style={styles.button}>Login</button>
          <p style={styles.link} onClick={() => navigate('/')}>← Back to Home</p>
          <p style={styles.link} onClick={() => navigate('/signup')}>Don't have an account? Sign up</p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '1300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(https://images.unsplash.com/photo-1584036561566-baf8f5f1b144)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '2rem',
    borderRadius: '10px',
    color: 'white',
    width: '100%',
    maxWidth: '500px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#fff',
  },
  input: {
    padding: '0.8rem 1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: '#eee',
    color: '#000',
    transition: 'all 0.3s ease',
  },
  button: {
    padding: '0.8rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  },
  link: {
    color: '#66b2ff',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textAlign: 'center'
  }
};

export default Login;