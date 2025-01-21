import React, { useState, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserApi, loginOTPApi, resendLoginOtpApi } from '../../apis/Api';
import loginui from '../../assets/images/loginui.jpeg';
import ReCAPTCHA from 'react-google-recaptcha';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

    if (!email.includes('@')) {
      setEmailError('Invalid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    if (!captchaToken) {
      toast.error('Complete the CAPTCHA to proceed.');
      recaptchaRef.current?.reset();
      return;
    }

    try {
      const { data } = await loginUserApi({ email, password, recaptchaToken: captchaToken });
      if (data.success) {
        toast.success(data.message);
        if (data.requireOTP) {
          setIsOtpSent(true);  // Set OTP required state
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.userData));
          navigate(data.userData.isAdmin ? '/admin/dashboard' : '/homepage');
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
  
    if (!otp) {
      setOtpError('OTP is required.');
      return;
    }
  
    if (!captchaToken) {
      toast.error('Complete the CAPTCHA to proceed.');
      recaptchaRef.current?.reset();
      return;
    }
  
    try {
      const { data } = await loginOTPApi({ email, otp, recaptchaToken: captchaToken });
  
      if (data.success) {
        toast.success('Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.userData));
        navigate(data.userData.isAdmin ? '/admin/dashboard' : '/homepage');
      } else {
        setOtpError(data.message);
      }
    } catch (error) {
      setOtpError('OTP verification failed.');
    }
  };

  const handleResendOtp = async () => {
    setIsResendingOtp(true);
    try {
      const { data } = await resendLoginOtpApi({ email });
      if (data.success) {
        toast.success('OTP resent successfully!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    }
    setIsResendingOtp(false);
  };

  return (
    <div className={`login-container ${isOtpSent ? 'blur-background' : ''}`}>
      <Toaster />
      <div className="login-box">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Please login to continue</p>

          {/* Email and Password Form */}
          {!isOtpSent && (
            <form onSubmit={handleLogin} className="login-fields">
              <input
                className="login-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="error-message">{emailError}</p>}

              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="error-message">{passwordError}</p>}

              <div className="forgot-password-container">
                <Link to="/forgotpassword" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>

              <div className="recaptcha-container">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LfXFb4qAAAAALY5BEaLWfTEVPgCX9kVsSpP3z4c"
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          )}

          {/* OTP Form */}
          {isOtpSent && (
            <div className="otp-modal-container">
              <div className="otp-modal">
                <h2>Verify OTP</h2>
                <form onSubmit={handleOtpSubmit}>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="login-input"
                  />
                  {otpError && <p className="error-message">{otpError}</p>}

                  <button type="submit" className="login-button">
                    Verify OTP
                  </button>
                </form>
                <div className="resend-otp-container">
                  <button
                    className="resend-otp-button"
                    onClick={handleResendOtp}
                    disabled={isResendingOtp}
                  >
                    {isResendingOtp ? 'Resending OTP...' : 'Resend OTP'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="login-images">
          <img src={loginui} alt="Login illustration" className="login-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
