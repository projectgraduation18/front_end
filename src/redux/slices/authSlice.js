import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

/* ================= THUNKS ================= */

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    const res = await authService.login(email, password);
    if (!res.success) return rejectWithValue(res.message);
    return res.data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    const res = await authService.register(
      payload.name,
      payload.email,
      payload.password
    );

    if (!res.success) return rejectWithValue(res.message);
    return res.data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    await authService.logout();
    return true;
  }
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async () => {
    return authService.getSession();
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async () => {
    return authService.getSession();
  }
);

/* ================= PASSWORD ================= */

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await authService.forgotPassword(email);
      return res.message;
    } catch {
      return rejectWithValue("Failed to send reset email");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otpCode, newPassword }, { rejectWithValue }) => {
    try {
      const res = await authService.resetPassword(
        email,
        otpCode,
        newPassword
      );

      if (!res.success) {
        return rejectWithValue(res.message);
      }

      return res; // 👈 مهم
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to reset password"
      );
    }
  }
);

/* ================= STATE ================= */

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,

  isLoading: false,
  isError: false,
  message: "",

  authInitialized: false,

  passwordLoading: false,
  passwordSuccess: false,
  passwordMessage: "",
};

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearError: (state) => {
      state.isError = false;
      state.message = "";
    },

    clearPasswordState: (state) => {
      state.passwordLoading = false;
      state.passwordSuccess = false;
      state.passwordMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= SESSION ================= */
      .addCase(restoreSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }

        state.authInitialized = true;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }

        state.authInitialized = true;
      })

      /* ================= LOGIN ================= */
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.authInitialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ================= REGISTER ================= */
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.authInitialized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ================= LOGOUT ================= */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.authInitialized = true;
      })

      /* ================= FORGOT PASSWORD ================= */
      .addCase(forgotPassword.pending, (state) => {
        state.passwordLoading = true;
        state.passwordSuccess = false;
        state.passwordMessage = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
  state.passwordLoading = false;
  state.passwordSuccess = true;
  state.passwordMessage = action.payload?.message;
})
      .addCase(forgotPassword.rejected, (state, action) => {
        state.passwordLoading = false;
        state.passwordSuccess = false;
        state.passwordMessage = action.payload;
      })

      /* ================= RESET PASSWORD ================= */
      .addCase(resetPassword.pending, (state) => {
        state.passwordLoading = true;
        state.passwordSuccess = false;
        state.passwordMessage = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
  state.passwordLoading = false;
  state.passwordSuccess = true;
  state.passwordMessage = action.payload?.message; // 👈 هنا الحل
})
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordLoading = false;
        state.passwordSuccess = false;
        state.passwordMessage = action.payload;
      });
  },
});

export const { clearError, clearPasswordState } = authSlice.actions;
export default authSlice.reducer;