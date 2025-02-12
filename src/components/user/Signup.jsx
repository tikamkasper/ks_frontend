import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Signup = () => {
  const [email_or_mobile, setEmail_or_mobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users//register/send/otp",
        { email_or_mobile },
        { withCredentials: true, credentials: "include" }
      );

      setVerificationMessage(response?.data?.message);
      setIsOtpSent(true);
    } catch (error) {
      setVerificationMessage(error.response?.data?.message);
    }
  };

  return (
    <div className="signup-send-otp">
      <h2 style={{ color: "darkgray" }}>Signup...</h2>
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email_or_mobile}
            onChange={(e) => setEmail_or_mobile(e.target.value)}
            placeholder="Enter Email/Mobile Number"
            disabled={isOtpSent}
            required
          />
          {isOtpSent && (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          )}
          <button type="submit">{!isOtpSent ? "Continue" : "Verify"}</button>
        </form>
        <Link to="#">Already have an account ? Login</Link>
      </div>
      <p>{verificationMessage}</p>
    </div>
  );
};

export default Signup;
