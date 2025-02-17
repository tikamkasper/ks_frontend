import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../redux/thunks/authThunk.js";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { email_or_mobile } = location.state || {};
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!email_or_mobile) navigate("/send-otp");
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate, email_or_mobile]);

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ email_or_mobile, otp }));
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
          maxLength={6}
        />
        <button type="submit" disabled={loading === "pending"}>
          {loading === "pending" ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VerifyOtp;
