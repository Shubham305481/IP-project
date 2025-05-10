import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const getPasswordStrength = (pwd) => {
    if (pwd.length > 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      return 'Strong';
    } else if (pwd.length >= 6) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.find(user => user.email === email.trim().toLowerCase());

    if (userExists) {
      toast.error('User already exists. Please log in.');
      return;
    }

    const newUser = { email: email.trim().toLowerCase(), password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    toast.success('Signup successful! Redirecting...');

    // Clear fields after successful signup
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <form onSubmit={handleSignup} style={styles.form}>
          <h2 style={styles.heading}>Sign Up</h2>
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            onFocus={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#000'; }}
            onBlur={(e) => { e.target.style.backgroundColor = styles.input.backgroundColor; e.target.style.color = styles.input.color; }}
          />
          <div style={styles.passwordStrength}>
            Password Strength: <strong>{getPasswordStrength(password)}</strong>
          </div>
          <input
            style={styles.input}
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            onFocus={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#000'; }}
            onBlur={(e) => { e.target.style.backgroundColor = styles.input.backgroundColor; e.target.style.color = styles.input.color; }}
          />
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            /> Show Password
          </label>
          <button type="submit" style={styles.button}>Create Account</button>
          <p style={styles.link} onClick={() => navigate('/')}>← Back to Home</p>
          <p style={styles.link} onClick={() => navigate('/login')}>Already have an account? Log in</p>
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
  passwordStrength: {
    fontSize: '0.9rem',
    color: '#ccc',
  },
  checkboxLabel: {
    fontSize: '0.9rem',
    color: '#ccc',
  },
  link: {
    color: '#66b2ff',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textAlign: 'center'
  }
};

export default Signup;
