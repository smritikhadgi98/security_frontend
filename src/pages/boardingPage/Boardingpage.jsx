import React from 'react';
import { Link } from 'react-router-dom';
import './Boardingpage.css';

const BoardingPage = () => {
  return (
    <div className="boarding-container">
      <div className="boarding-content">
        <h1 className="boarding-title">Welcome to Our Service</h1>
        <p className="boarding-subtitle">Get Started with us today!</p>
        <div className="boarding-buttons">
          <Link to="/login" className="boarding-button">Login</Link>
          <Link to="/register" className="boarding-button">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default BoardingPage;
