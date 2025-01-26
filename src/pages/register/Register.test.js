import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserApi } from '../../apis/Api';
import './Register.css';

// Utility function to sanitize input
const sanitizeInput = (input) => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const validation = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!email.trim() || !email.includes('@')) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) return;

    registerUserApi({ username, email, phone, password })
      .then((res) => {
        if (res.data.success) {
          toast.success('Registration successful! Please login to continue.');
          navigate('/login');
        } else {
          toast.error(res.data.message || 'Registration failed. Please try again.');
        }
      })
      .catch((err) => toast.error(err.response?.data?.message || 'Registration failed.'));
  };

  return (
    <div className="register-container">
      <Toaster />
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(sanitizeInput(e.target.value))}
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(sanitizeInput(e.target.value))}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(sanitizeInput(e.target.value))}
            />
            {phoneError && <p className="error-message">{phoneError}</p>}
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(sanitizeInput(e.target.value))}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(sanitizeInput(e.target.value))}
            />
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
          </div>
          <button type="submit" className="register-button">
            Sign Up
          </button>
        </form>
        <div className="login-link">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
