import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const CustomerLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role set to 'customer'
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(username, password, role);

    axios.post('http://localhost:9545/user/login', { username, password, role })
      .then(result => {
        const userRole = result.data.role ? result.data.role.toLowerCase() : '';

        switch (userRole) {
          case 'admin':
            navigate('/admin');
            break;
          case 'customer':
            navigate('/customerDashboard');
            break;
          case 'designer':
            navigate('/designerDashboard');
            break;
          default:
            alert('Invalid role.');
            break;
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    navigate('/register');
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    // Handle forgot password logic here
    console.log("Forgot password for username:", username);
    alert('Password reset link sent.');
  };

  return (
    <div className="login-container">
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="designer">Designer</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="login-links">
        <p>
          Don't have an account?{' '}
          <button onClick={() => setShowRegister(true)}>Register</button>
        </p>
        <p>
          Forgot password?{' '}
          <span onClick={() => setShowForgotPassword(true)}>Forgot Password</span>
        </p>
      </div>

      {showRegister && (
        <div className="register-form">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      )}

      {showForgotPassword && (
        <div className="forgot-password-form">
          <h2>Forgot Password</h2>
          <form onSubmit={handleForgotPassword}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <button type="submit">Send Reset Link</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomerLogin;
