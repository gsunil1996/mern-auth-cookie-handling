import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import handleError from "../errorHandler";

const baseUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD__BASE_URL;

const initialState = {
  isAuthenticated: false,
  userData: null,

  // login
  loginIsLoading: false,
  loginIsError: false,
  loginIsSuccess: false,
  loginError: "",

  // logout
  logoutIsLoading: false,
  logoutIsError: false,
  logoutIsSuccess: false,
  logoutError: "",

  // validate token
  validateTokenIsLoading: false,
  validateTokenIsError: false,
  validateTokenIsSuccess: false,
  validateTokenError: "",
};

export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logoutAction",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/logout`, {});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/me`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLogin: (state) => {
      state.loginIsLoading = false;
      state.loginIsError = false;
      state.loginIsSuccess = false;
      state.loginError = "";
    },
    resetLogout: (state) => {
      state.logoutIsLoading = false;
      state.logoutIsError = false;
      state.loginIsSuccess = false;
      state.logoutError = "";
    },
    resetValidateToken: (state) => {
      state.validateTokenIsLoading = false;
      state.validateTokenIsError = false;
      state.validateTokenIsSuccess = false;
      state.validateTokenError = "";
    },
  },
  extraReducers(builder) {
    builder
      // login
      .addCase(loginAction.pending, (state) => {
        state.loginIsLoading = true;
        state.loginIsError = false;
        state.loginError = "";
        state.loginIsSuccess = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.loginIsLoading = false;
        state.loginIsError = false;
        state.loginError = "";
        state.loginIsSuccess = true;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userData = null;
        state.loginIsLoading = false;
        state.loginIsError = true;
        state.loginError = action.payload;
        state.loginIsSuccess = false;
      })
      // logout
      .addCase(logoutAction.pending, (state) => {
        state.logoutIsLoading = true;
        state.logoutIsError = false;
        state.logoutError = "";
        state.logoutIsSuccess = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userData = null;
        state.logoutIsLoading = false;
        state.logoutIsError = false;
        state.logoutError = "";
        state.logoutIsSuccess = true;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.logoutIsLoading = false;
        state.logoutIsError = true;
        state.logoutError = action.payload;
        state.logoutIsSuccess = false;
      })
      // validate token
      .addCase(validateToken.pending, (state) => {
        state.validateTokenIsLoading = true;
        state.validateTokenIsError = false;
        state.validateTokenError = "";
        state.validateTokenIsSuccess = false;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.validateTokenIsLoading = false;
        state.validateTokenIsError = false;
        state.validateTokenError = "";
        state.validateTokenIsSuccess = true;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userData = null;
        state.validateTokenIsLoading = false;
        state.validateTokenIsError = true;
        state.validateTokenError = action.payload;
        state.validateTokenIsSuccess = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetLogin, resetLogout, resetValidateToken } =
  authSlice.actions;

export default authSlice.reducer;
