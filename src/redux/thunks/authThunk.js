import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constants.js";

// Axios Configuration
const axiosConfig = { withCredentials: true, credentials: "include" };

// 🔹 Send OTP Thunk
export const sendOtp = createAsyncThunk(
  "auth/send_otp",
  async (email_or_mobile, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/users/register/send_otp`,
        { email_or_mobile },
        axiosConfig
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

// 🔹 Verify OTP Thunk
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email_or_mobile, otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/users/register/verify_otp`,
        { email_or_mobile, otp },
        axiosConfig
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Invalid OTP");
    }
  }
);
