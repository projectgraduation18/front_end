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

import { loginUser, clearError } from "../redux/slices/authSlice";

export default function LoginPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    message,
    user,
    isAuthenticated,
    authInitialized,
  } = useSelector((state) => state.auth);

  /* ================= LOGIN SUCCESS HANDLER ================= */
  useEffect(() => {
    if (!authInitialized) return;

    if (isAuthenticated && user) {
      setShowSuccess(true);

      const timer = setTimeout(() => {
        const role = user?.role?.toLowerCase();

        if (role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/student", { replace: true });
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, authInitialized, navigate]);

  /* ================= VALIDATION ================= */
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation.invalid_email"))
      .required(t("validation.email_required")),
    password: Yup.string()
      .min(8, t("validation.password_min"))
      .required(t("validation.password_required")),
  });

  /* ================= FORMIK ================= */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      dispatch(clearError());

      const result = await dispatch(loginUser(values));

      setSubmitting(false);

      if (result.meta.requestStatus === "rejected") {
        console.log("Login failed:", result.payload);
      }
    },
  });

  /* ================= UI ================= */
  return (
    <motion.div
      {...fadeUp(0)}
      className="h-screen flex items-center justify-center px-4 bg-background"
    >
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 mx-auto flex items-center justify-center bg-primary rounded-xl shadow-lg shadow-primary/30">
            <LogIn className="w-6 h-6 text-primary-foreground" />
          </div>

          <h1 className="text-2xl font-bold mt-2">
            {t("login.title")}
          </h1>

          <p className="text-sm text-muted-foreground">
            {t("login.subtitle")}
          </p>
        </div>

        {/* CARD */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">

          {/* SUCCESS STATE */}
          {showSuccess ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
                <LogIn className="w-6 h-6 text-green-600" />
              </div>

              <h2 className="font-semibold text-lg">
                {t("login.success_title") || "Login successful"}
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                {t("login.success_message") || "Redirecting..."}
              </p>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-5">

              {/* ERROR */}
              {isError && message && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                  {message}
                </div>
              )}

              {/* EMAIL */}
              <FormInput
                id="email"
                label={t("login.email_label")}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                error={formik.errors.email}
                touched={formik.touched.email}
                {...formik.getFieldProps("email")}
              />

              {/* PASSWORD */}
              <FormInput
                id="password"
                label={t("login.password_label")}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
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

              {/* BUTTON */}
              <button
                type="submit"
                disabled={formik.isSubmitting || isLoading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-medium disabled:opacity-60"
              >
                {formik.isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("login.loading") || "Loading..."}
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    {t("login.submit_button")}
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          {t("login.signup_prompt")}{" "}
          <Link to="/signup" className="text-primary hover:underline">
            {t("login.signup_link")}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}