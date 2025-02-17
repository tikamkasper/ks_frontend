import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//send Otp
export const sendOtp = createAsyncThunk(
  "sendOtp",
  async (email_or_mobile, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register/send/otp",
        { email_or_mobile },
        { withCredentials: true, credentials: "include" }
      );
      return response.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//verify Otp
export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async (loginInput, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register/verify/otp",
        loginInput,
        { withCredentials: true, credentials: "include" }
      );
      return response.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
