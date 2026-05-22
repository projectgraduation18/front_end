// src/pages/LoginPage.jsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Loader2 } from "lucide-react";
import FormInput from "@/components/FormInput";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
  loginUser,
  resetAuthState,
  clearError,
} from "../redux/slices/authSlice";

export default function LoginPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isSuccess && user) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation.invalid_email"))
      .required(t("validation.email_required")),
    password: Yup.string()
      .min(8, t("validation.password_min"))
      .required(t("validation.password_required")),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(clearError());
      const result = await dispatch(loginUser(values));
      setSubmitting(false);

      if (result.meta.requestStatus === "rejected") {
        console.error("Login failed:", result.payload);
      }
    },
  });

  return (
    <motion.div
      {...fadeUp(0)}
      className="h-[100vh] flex items-center justify-center px-4 py-12 bg-background"
    >
      <div className="w-full max-w-md">
        <div className="mb-3 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-2 shadow-lg shadow-primary/30">
            <LogIn className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {t("login.title")}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {t("login.subtitle")}
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
          {showSuccess ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <LogIn className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                {t("login.success_title") || "تم تسجيل الدخول بنجاح"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t("login.success_message") || "جاري تحويلك إلى لوحة التحكم..."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={formik.handleSubmit}
              noValidate
              className="space-y-5"
            >
              {/* عرض رسالة الخطأ */}
              {isError && message && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {message}
                </div>
              )}

              <FormInput
                id="email"
                label={t("login.email_label")}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                error={formik.errors.email}
                touched={formik.touched.email}
                {...formik.getFieldProps("email")}
              />

              <FormInput
                id="password"
                label={t("login.password_label")}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                error={formik.errors.password}
                touched={formik.touched.password}
                rightLabel={
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:underline"
                  >
                    {t("login.forget_password")}
                  </Link>
                }
                {...formik.getFieldProps("password")}
              />

              <button
                type="submit"
                disabled={formik.isSubmitting || isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm py-2.5 px-4 transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm shadow-primary/20"
              >
                {formik.isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />{" "}
                    {t("login.signing_in") || "جاري الدخول..."}
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" /> {t("login.submit_button")}
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {t("login.signup_prompt")}{" "}
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline"
          >
            {t("login.signup_link")}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
