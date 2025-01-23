import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserApi, verifyRegisterOtpApi } from '../../apis/Api';
import registerui from '../../assets/images/login.webp';
import zxcvbn from 'zxcvbn'; // Import zxcvbn for password strength checking
import DOMPurify from 'dompurify'; // Import dompurify for input sanitization
import './Register.css';

function Register() {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [otp, setOtp] = useState(''); // State for OTP input
  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP sent status
  
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpError, setOtpError] = useState(''); // Error for OTP input

  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState('');
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    
    // Your existing validation for other fields
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

  // Function to check password strength using zxcvbn
  const checkPasswordStrength = (password) => {
    const result = zxcvbn(password);
    setPasswordStrength(result.score);  // 0 to 4 score
    if (result.score === 0) {
      setPasswordStrengthLabel('Low');
    } else if (result.score === 1 || result.score === 2) {
      setPasswordStrengthLabel('Medium');
    } else {
      setPasswordStrengthLabel('High');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Sanitize inputs to prevent HTML injection
    const sanitizedData = {
      userName: DOMPurify.sanitize(userName),
      email: DOMPurify.sanitize(email),
      password: DOMPurify.sanitize(password),
      phone: DOMPurify.sanitize(phone)
    };

    registerUserApi(sanitizedData)
      .then((response) => {
        toast.success('Registration successful! Please verify your email.');
        setIsOtpSent(true); // OTP sent after successful registration
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Registration failed. Please try again.');
        }
      });
  };

  const handleOtpVerification = (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setOtpError('OTP is required');
      return;
    }

    const sanitizedOtp = DOMPurify.sanitize(otp); // Sanitize OTP input

    const data = {
      email: DOMPurify.sanitize(email),
      otp: sanitizedOtp
    };

    verifyRegisterOtpApi(data)
      .then((response) => {
        toast.success('Email verified successfully!');
        navigate('/login'); // Redirect to login after successful verification
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setOtpError(error.response.data.message);
        } else {
          setOtpError('Verification failed. Please try again.');
        }
      });
  };

  return (
    <div className="register-container">
      <Toaster />
      <div className="register-box">
        <div className="register-form">
          <h2 className="register-title">Sign Up</h2>
         
          {/* Registration Form */}
          {!isOtpSent ? (
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsTypingPassword(true); // User starts typing password
                    checkPasswordStrength(e.target.value);  // Check password strength on change
                  }}
                />
                {isTypingPassword && (
                  <p className={`password-strength ${passwordStrengthLabel.toLowerCase()}`}>
                    Password Strength: {passwordStrengthLabel}
                  </p>
                )}
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
              <button type="submit" className="register-button">Sign Up</button>
            </form>
          ) : (
            // OTP Verification Form
            <form onSubmit={handleOtpVerification} className="otp-verification">
              <div className="input-container">
                <input
                  className="register-input"
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {otpError && <p className="error-message">{otpError}</p>}
              </div>
              <button type="submit" className="register-button">Verify OTP</button>
            </form>
          )}

          <div className="login-link">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-black hover:underline">Login</Link>
            </p>
          </div>
        </div>
        <div className="register-images">
          <div className="register-image">
            <img src={registerui} alt="Register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
