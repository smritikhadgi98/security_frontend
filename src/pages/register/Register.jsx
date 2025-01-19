import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { registerUserApi } from '../../apis/Api';
import registerui from '../../assets/images/login.webp';
import './Register.css';

function Register() {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!userName.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!email.trim()) {
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
    } else if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Stop form submission if validation fails
      return;
    }

    const data = {
      userName: userName,
      email: email,
      password: password,
      phone: phone
    };

    registerUserApi(data)
      .then((response) => {
        toast.success('Registration successful! Please login to continue.');
        // Optionally clear form fields after successful registration
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Registration failed. Please try again.');
        }
      });
  };

  return (
    <div className="register-container">
      <Toaster />
      <div className="register-box">
        <div className="register-form">
          <h2 className="register-title">Sign Up</h2>
          <p className="register-subtitle">
            Beauty Tailored to Your Skin: Discover Makeup & Skincare Perfect for Your Unique Type
          </p>

          <form onSubmit={handleSubmit} className="register-fields">
            <div className="input-container">
              <input
                className="register-input"
                type="text"
                name="username"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <p className="error-message">{usernameError}</p>}
            </div>
            <div className="input-container">
              <input
                className="register-input"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="input-container">
              <input
                className="register-input"
                type="phone"
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phoneError && <p className="error-message">{phoneError}</p>}
            </div>
            <div className="input-container">
              <input
                className="register-input"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <div className="input-container">
              <input
                className="register-input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
        <div className="register-images">
          <div className="register-image">
            <img src={registerui} alt="Skincare" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
