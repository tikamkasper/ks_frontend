import { createSlice } from "@reduxjs/toolkit";
import { sendOtp, verifyOtp } from "../thunks/authThunk.js";
import { LOADING } from "../constants.js";

// authSlice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    loading: LOADING.IDLE,
    error: null,
    isAuthenticated: null,
  },
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // authentication
    builder
      .addCase(sendOtp.pending, (state, action) => {
        state.data = [];
        state.loading = LOADING.PENDING;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = LOADING.SUCCEEDED;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.data = [];
        state.loading = LOADING.FAILED;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // verify Otp
    builder
      .addCase(verifyOtp.pending, (state, action) => {
        state.data = [];
        state.loading = LOADING.PENDING;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = LOADING.SUCCEEDED;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.data = [];
        state.loading = LOADING.FAILED;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
export const { clearError } = authSlice.actions;
