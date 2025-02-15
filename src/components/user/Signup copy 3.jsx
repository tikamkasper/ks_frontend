import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import styles from "./Signup.module.css"; // Import the CSS Module

const Signup = () => {
  const [email_or_mobile, setEmail_or_mobile] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail_or_mobile(e.target.value);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register/send/otp",
        { email_or_mobile, role },
        { withCredentials: true, credentials: "include" }
      );

      setIsOtpSent(response?.data?.success);
      setVerificationMessage(response?.data?.message);
    } catch (error) {
      setVerificationMessage(error.response?.data?.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users//register/verify/otp",
        { email_or_mobile, role, otp },
        { withCredentials: true, credentials: "include" }
      );
      setIsOtpVerified(response?.data?.success);
      setVerificationMessage(response?.data?.message);
      setOtp("");
      setIsOtpSent(false);
      console.log("response?.data.data.role", response?.data.data.role);
      response?.data.data.role === "customer" && navigate("/");
      response?.data.data.role === "seller" && navigate("/seller/dashboard");
    } catch (error) {
      setVerificationMessage(error?.response?.data?.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      sendOtp();
    } else {
      verifyOtp();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.formTitle}>
          <h2>Signup...</h2>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.signupInupt}>
              <input
                type="text"
                value={email_or_mobile}
                onChange={handleInputChange}
                placeholder="Enter Email/Mobile Number"
                disabled={isOtpSent}
                required
              />
              {isOtpSent && (
                <button type="button" onClick={() => setIsOtpSent(!isOtpSent)}>
                  Change
                </button>
              )}
            </div>
            <div className={styles.userRole}>
              <p>Create Account For ?</p>
              <div className={styles.radios}>
                <div className="customerRadio">
                  <input
                    type="radio"
                    name="role"
                    id="customer"
                    value="customer"
                    onChange={handleRoleChange}
                    disabled={isOtpSent}
                    required
                  />
                  &nbsp;&nbsp;
                  <label htmlFor="customer">Customer</label>
                </div>
                <div className="sellerRadio">
                  <input
                    type="radio"
                    name="role"
                    id="seller"
                    value="seller"
                    onChange={handleRoleChange}
                    disabled={isOtpSent}
                    required
                  />
                  &nbsp;&nbsp;
                  <label htmlFor="seller">Seller</label>
                </div>
              </div>
            </div>
            {isOtpSent && (
              <div className={styles.otpInput}>
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter OTP"
                  required
                  maxLength={6}
                />
              </div>
            )}
            <div className="submitBtn">
              <button type="submit">
                {!isOtpSent ? "Continue" : "Verify"}
              </button>
            </div>
          </form>
          <div className="">
            <Link to="#">Already have an account? Login</Link>
          </div>
        </div>
        <div className={styles.verificationMessage}>
          <p>{verificationMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
