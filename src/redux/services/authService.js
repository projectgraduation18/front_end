import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://projectgraduation18.runasp.net/api/";

const COOKIE_OPTIONS = {
  expires: 7,
  secure: false,
  sameSite: "Strict",
  path: "/",
};

/* ================= HELPERS ================= */

const saveSession = (user, token) => {
  Cookies.set("token", token, COOKIE_OPTIONS);
  Cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);
};

const clearSession = () => {
  Cookies.remove("token");
  Cookies.remove("user");
};

/* ================= SERVICE ================= */

const authService = {
  /* ================= LOGIN ================= */
  login: async (email, password) => {
    const { data } = await axios.post(`${API_URL}Auth/login`, {
      email,
      password,
    });

    if (!data?.token) {
      return { success: false, message: "Invalid credentials" };
    }

    const user = {
      id: data.userId,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    saveSession(user, data.token);

    return {
      success: true,
      data: { user, token: data.token },
    };
  },

  /* ================= REGISTER ================= */
  register: async (name, email, password) => {
    const { data } = await axios.post(`${API_URL}Auth/register`, {
      name,
      email,
      password,
    });

    if (!data?.token) {
      return { success: false, message: "Register failed" };
    }

    const user = {
      id: data.userId,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    saveSession(user, data.token);

    return {
      success: true,
      data: { user, token: data.token },
    };
  },

  /* ================= LOGOUT ================= */
  logout: async () => {
    const token = Cookies.get("token");

    try {
      if (token) {
        await axios.post(
          `${API_URL}Auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (err) {
      console.log("logout error:", err);
    } finally {
      clearSession();
    }

    return { success: true };
  },

  /* ================= FORGOT PASSWORD ================= */
  forgotPassword: async (email) => {
    const { data } = await axios.post(
      `${API_URL}Auth/forgot-password`,
      { email }
    );

    return {
      success: true,
      message: data?.message || "Reset email sent successfully",
    };
  },

  /* ================= RESET PASSWORD ================= */
  resetPassword: async (email, otpCode, newPassword) => {
    const { data } = await axios.post(
      `${API_URL}Auth/reset-password`,
      {
        email,
        otpCode,
        newPassword,
      }
    );

    return {
      success: true,
      message: data?.message || "Password reset successful",
    };
  },

  /* ================= SESSION ================= */
  getSession: () => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");

    if (!token || !user) return null;

    try {
      return {
        token,
        user: JSON.parse(user),
      };
    } catch {
      return null;
    }
  },
};

export default authService;