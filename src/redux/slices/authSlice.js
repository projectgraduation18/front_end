// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    const result = await authService.login(email, password);

    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    const result = await authService.register(name, email, password);

    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  return {};
});

export const checkAuthStatus = createAsyncThunk("auth/check", async () => {
  return authService.checkAuth();
});

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    clearError: (state) => {
      state.isError = false;
      state.message = "";
    },
    restoreSession: (state) => {
      const token = Cookies.get("token");
      const user = Cookies.get("user");

      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
        state.isSuccess = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      Cookies.remove("token", { path: "/" });
      Cookies.remove("user", { path: "/" });
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== Login Cases ==========
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.message = action.payload;
      })

      // ========== Register Cases ==========
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.message = action.payload;
      })

      // ========== Logout Cases ==========
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
  },
});

export const { resetAuthState, clearError, restoreSession, logout } =
  authSlice.actions;
export default authSlice.reducer;
