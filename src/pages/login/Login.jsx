import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserApi } from '../../apis/Api';
import loginui from '../../assets/images/loginui.jpeg';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validation = () => {
    let isValid = true;

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError('Email is empty or invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is empty');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = { email, password };

    // In Login component, handleLogin function
    loginUserApi(data).then((res) => {
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        // Setting token and user data in local storage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.userData));
        localStorage.setItem('id', res.data.userData.id); // Storing the user ID separately

        // Redirect to appropriate page based on isAdmin property
        if (res.data.userData.isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/homepage');
        }
      }
    }).catch((error) => {
      console.error('Login Error:', error);
      toast.error('An error occurred. Please try again.');
    });
  }

    return (
      <div className="login-container">
        <Toaster />
        <div className="login-box">
          <div className="login-form">
            <h2 className="login-title">Login</h2>
            <p className="login-subtitle">Please Login to Continue</p>

            <form onSubmit={handleLogin} className="login-fields">
              <div className="input-container">
                <input
                  className="login-input"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
              <div className="input-container">
                <input
                  className="login-input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p className="error-message">{passwordError}</p>}
              </div>
              <button onClick={handleLogin} type="submit" className="login-button">
                Login
              </button>
            </form>

            <div className="login-link">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="text-black hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>

          <div className="login-images">
            <div className="login-image">
              <img src={loginui} alt="Login" />
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Login; // Ensure this is a default export
