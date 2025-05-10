import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    fever: '',
    bodyPain: '',
    age: '',
    runnyNose: '',
    diffBreath: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert input values to correct types
    const requestData = {
      fever: parseFloat(formData.fever),
      bodyPain: parseInt(formData.bodyPain),
      age: parseInt(formData.age),
      runnyNose: parseInt(formData.runnyNose),
      diffBreath: parseInt(formData.diffBreath),
    };

    try {
      const response = axios.post('http://127.0.0.1:5000/predict', requestData);
      setResult(response.data.prediction);
    } catch (error) {
      console.error('Prediction error:', error);
      setResult('Error predicting. Please try again.');
    }
  };

  const styles = {
    container: {
      height: '100%',
      width: '1150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(https://images.unsplash.com/photo-1584036561566-baf8f5f1b144)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '1rem',
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
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '0.2rem',
    },
    helper: {
      fontSize: '0.85rem',
      color: '#ccc',
      marginTop: '-0.8rem',
      marginBottom: '0.5rem',
    },
    button: {
      padding: '0.8rem 1rem',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    result: {
      marginTop: '1rem',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textAlign: 'center',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>COVID-19 Prediction Form</h2>

          <div>
            <label style={styles.label}>Fever (°F)</label>
            <input
              type="number"
              name="fever"
              value={formData.fever}
              onChange={handleChange}
              placeholder="e.g., 101.5"
              style={styles.input}
              min="98"
              max="104"
              required
            />
            <div style={styles.helper}><br></br>Enter body temperature (98–104 °F).</div>
          </div>

          <div>
            <label style={styles.label}><br></br>Body Pain</label>
            <select
              name="bodyPain"
              value={formData.bodyPain}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes (1)</option>
              <option value="0">No (0)</option>
            </select>
            <div style={styles.helper}><br></br>1 = Yes, 0 = No.</div>
          </div>

          <div>
            <label style={styles.label}>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g., 30"
              style={styles.input}
              min="1"
              max="100"
              required
            />
            <div style={styles.helper}><br></br>Enter your age (1–100 years).</div>
          </div>

          <div>
            <label style={styles.label}>Runny Nose</label>
            <select
              name="runnyNose"
              value={formData.runnyNose}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes (1)</option>
              <option value="0">No (0)</option>
            </select>
            <div style={styles.helper}><br></br>1 = Yes, 0 = No.</div>
          </div>

          <div>
            <label style={styles.label}>Difficulty in Breathing</label>
            <select
              name="diffBreath"
              value={formData.diffBreath}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes (1)</option>
              <option value="0">No (0)</option>
              <option value="-1">Not Sure (-1)</option>
            </select>
            <div style={styles.helper}><br></br>1 = Yes, 0 = No, -1 = Not Sure.</div>
          </div>

          <button type="submit" style={styles.button}>Predict</button>

          {result && <div style={styles.result}>Prediction Result: {result}</div>}
        </form>
      </div>
    </div>
  );
};

export default PredictionForm;
