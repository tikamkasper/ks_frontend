import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../redux/thunks/authThunk.js";
import { useNavigate } from "react-router-dom";

const SendOtp = () => {
  const [email_or_mobile, setEmail_or_mobile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otpSent, loading, error } = useSelector((state) => state.auth);

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(sendOtp(email_or_mobile));
  };

  if (otpSent) {
    navigate("/verify-otp", { state: { email_or_mobile } });
  }

  return (
    <div>
      <h2>Enter Email/Mobile Number</h2>
      <form onSubmit={handleSendOtp}>
        <input
          type="text"
          value={email_or_mobile}
          onChange={(e) => setEmail_or_mobile(e.target.value)}
          placeholder="Email or Mobile Number"
          required
        />
        <button type="submit" disabled={loading === "pending"}>
          {loading === "pending" ? "Sending..." : "Send OTP"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SendOtp;
