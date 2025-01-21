import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { forgotPasswordApi, verifyOtpApi } from '../apis/Api';
import './ForgetPassword.css';  // Assuming you have a separate CSS file for styling

const ForgetPassword = () => {
  const [phone, setPhoneNumber] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setNewPassword] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    forgotPasswordApi({ phone })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setIsSent(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const data = {
      phone: phone,
      otp: otp,
      password: password,
    };
    verifyOtpApi(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
      });
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-box">
        <div className="forget-password-form">
          <h2 className="forget-password-title">Forgot Password</h2>
          <p className="forget-password-subtitle">Please enter your phone number</p>

          <form onSubmit={handleSendOtp} className="forget-password-fields">
            <div className="input-container">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 sm:text-sm">
                  +977
                </span>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="forget-password-input"
                  placeholder="Enter your phone number"
                  disabled={isSent}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {!isSent && (
              <div>
                <button
                  type="submit"
                  className="forget-password-button"
                >
                  Send OTP
                </button>
              </div>
            )}

            {isSent && (
              <>
                <div className="otp-info">
                  <p className="text-sm text-blue-700">
                    OTP has been sent to your phone number <strong>{phone}</strong>
                  </p>
                </div>

                <div className="input-container">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <input
                    type="number"
                    name="otp"
                    id="otp"
                    className="forget-password-input"
                    placeholder="Enter the OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    className="forget-password-input"
                    placeholder="Enter your new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="forget-password-button"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP and Reset Password
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
