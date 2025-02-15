import { createSlice } from "@reduxjs/toolkit";
import { sendOtp, verifyOtp } from "../thunks/authThunk.js";

export const STATUS = Object.freeze({
  LOADING: 'loading',
  SUCCEESS: 'success',
  FAILED: 'failed',
});


// authSlice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: null,
    error: null,
    isAuthenticated: null,
  },
  reducers: {
    clearError: (state, action) => {
        state.error = null;
    }  
},

  extraReducers: (builder) => {
    // authentication
    builder
      .addCase(sendOtp.pending, (state, action) => {
        state.data = [];
        state.status = STATUS.LOADING;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.SUCCEESS;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.data = [];
        state.status = STATUS.FAILED;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // verify Otp
    builder
      .addCase(verifyOtp.pending, (state, action) => {
        state.data = [];
        state.status = STATUS.LOADING;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.SUCCEESS;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.data = [];
        state.status = STATUS.FAILED;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
    })

      export const { clearError} = userSlice.actions;