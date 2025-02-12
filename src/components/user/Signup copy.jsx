import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleInputChange = (e) => {
    setEmailOrMobile(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/send-otp",
        {
          email_or_mobile: emailOrMobile,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      setVerificationMessage(response?.data?.message);
      setIsOtpSent(true);
    } catch (error) {
      setVerificationMessage(error.response?.data?.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/verify-otp",
        {
          email_or_mobile: emailOrMobile,
          otp,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      setVerificationMessage(response.data.message);
    } catch (error) {
      setVerificationMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        value={email_or_mobile}
        onChange={handleInputChange}
        placeholder="Enter Email/Mobile Number"
        required
      />
      {!isOtpSent ? (
        <button onClick={sendOtp}>Continue</button>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter OTP"
            required
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
      <p>{verificationMessage}</p>
    </div>
  );
};

export default Register;
