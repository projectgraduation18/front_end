// src/store/services/authService.js
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://projectgraduation18.runasp.net/api/";

const COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: "Strict",
  path: "/",
};

const authService = {
  login: async (email, password) => {
    try {
      console.log("🌐 Calling API:", `${API_URL}Auth/login`);

      const response = await axios.post(`${API_URL}Auth/login`, {
        email,
        password,
      });

      console.log("✅ Response:", response.data);

      if (response.data.token) {
        const user = {
          id: response.data.userId,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        };
        const token = response.data.token;

        Cookies.set("token", token, COOKIE_OPTIONS);
        Cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);

        return {
          success: true,
          data: { user, token },
          message: "تم تسجيل الدخول بنجاح",
        };
      }

      return {
        success: false,
        message: response.data.message || "فشل تسجيل الدخول",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "حدث خطأ في الاتصال بالخادم",
      };
    }
  },

  register: async (name, email, password) => {
    try {
      console.log("🌐 Calling API:", `${API_URL}Auth/register`);

      const response = await axios.post(`${API_URL}Auth/register`, {
        name,
        email,
        password,
      });

      console.log("✅ Response:", response.data);

      if (response.data.token) {
        const user = {
          id: response.data.userId,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        };
        const token = response.data.token;

        Cookies.set("token", token, COOKIE_OPTIONS);
        Cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);

        return {
          success: true,
          data: { user, token },
          message: "تم إنشاء الحساب بنجاح",
        };
      }

      return {
        success: false,
        message: response.data.message || "فشل إنشاء الحساب",
      };
    } catch (error) {
      console.error("Register error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "حدث خطأ في الاتصال بالخادم",
      };
    }
  },

  logout: async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await axios.post(
          `${API_URL}Auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      Cookies.remove("token", { path: "/" });
      Cookies.remove("user", { path: "/" });
    }
    return { success: true };
  },

  checkAuth: () => {
    const token = Cookies.get("token");
    const userCookie = Cookies.get("user");

    if (token && userCookie) {
      try {
        const user = JSON.parse(userCookie);
        return { isAuthenticated: true, token, user };
      } catch {
        return { isAuthenticated: false, token: null, user: null };
      }
    }

    return { isAuthenticated: false, token: null, user: null };
  },
};

export default authService;
