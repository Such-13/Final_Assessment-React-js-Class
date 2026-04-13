import React from 'react';
import { useLogin } from '../hooks/useLogin';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const { username, setUsername, handleLogin } = useLogin();

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="logo-container">
          {/* Make sure you have the PNB logo in your public folder or assets */}
          <img src="/pnb-logo.png" alt="PNB Logo" className="pnb-logo" />
        </div>

        <h2 className="login-header">Login to your Account</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>

          <div className="form-footer">
            <label className="checkbox-container">
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>
        </form>

        <div className="footer-links">
          <span>Terms and Conditions</span>
          <span>Privacy Policy</span>
          <span>CA Privacy Notice</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;