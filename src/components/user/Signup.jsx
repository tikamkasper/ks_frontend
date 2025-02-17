import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Signup.module.css"; // Import the CSS Module
import { sendOtp, verifyOtp } from "../../redux/thunks/authThunk.js";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [email_or_mobile, setEmail_or_mobile] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (data.success) {
      setIsOtpSent(true);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      dispatch(sendOtp(email_or_mobile));
    } else {
      dispatch(verifyOtp({ email_or_mobile, otp }));
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
                onChange={(e) => setEmail_or_mobile(e.target.value)}
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
            {isOtpSent && (
              <div className={styles.otpInput}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
          <p>{data.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
