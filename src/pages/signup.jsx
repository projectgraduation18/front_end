import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Loader2, Check } from "lucide-react";
import FormInput from "@/components/FormInput";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/utils";
import { useTranslation } from "react-i18next";

import { registerUser, clearError } from "../redux/slices/authSlice";

/* ================= PASSWORD STRENGTH ================= */
function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
  ];

  if (!password) return null;

  return (
    <div className="flex gap-3 flex-wrap pt-1">
      {checks.map((c) => (
        <span
          key={c.label}
          className={`flex items-center gap-1 text-xs ${
            c.ok ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Check className={`w-3 h-3 ${c.ok ? "text-primary" : "opacity-40"}`} />
          {c.label}
        </span>
      ))}
    </div>
  );
}

/* ================= COMPONENT ================= */
export default function SignupPage() {
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

  /* ================= SUCCESS HANDLER ================= */
  useEffect(() => {
    if (!authInitialized) return;

    if (isAuthenticated && user) {
      setShowSuccess(true);

      const timer = setTimeout(() => {
        const role = user?.role?.toLowerCase();

        if (role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, authInitialized, navigate]);

  /* ================= VALIDATION ================= */
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, t("validation.name_min"))
      .required(t("validation.name_required")),

    email: Yup.string()
      .email(t("validation.email_invalid"))
      .required(t("validation.email_required")),

    password: Yup.string()
      .min(8, t("validation.password_min"))
      .matches(/[A-Z]/, t("validation.password_uppercase"))
      .matches(/[0-9]/, t("validation.password_number"))
      .required(t("validation.password_required")),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("validation.confirm_not_match"))
      .required(t("validation.confirm_required")),
  });

  /* ================= FORMIK ================= */
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      dispatch(clearError());

      const result = await dispatch(
        registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );

      setSubmitting(false);

      if (result.meta.requestStatus === "rejected") {
        console.log("Registration failed:", result.payload);
      }
    },
  });

  /* ================= UI ================= */
  return (
    <motion.div
      {...fadeUp(0)}
      className="min-h-screen flex items-center justify-center px-4 bg-background"
    >
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="mb-3 text-center">
          <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <UserPlus className="w-6 h-6 text-primary-foreground" />
          </div>

          <h1 className="text-2xl font-bold mt-2">
            {t("signup.title")}
          </h1>
        </div>

        {/* CARD */}
        <div className="bg-card rounded-2xl border p-8">

          {showSuccess ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-600" />
              </div>

              <h2 className="text-lg font-semibold">
                {t("signup.account_created")}
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                {t("signup.welcome_message", {
                  name: formik.values.name,
                })}
              </p>
            </div>

          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-4">

              {/* ERROR */}
              {isError && message && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {message}
                </div>
              )}

              {/* NAME */}
              <FormInput
                id="name"
                label={t("signup.name_label")}
                type="text"
                autoComplete="name"
                error={formik.errors.name}
                touched={formik.touched.name}
                {...formik.getFieldProps("name")}
              />

              {/* EMAIL */}
              <FormInput
                id="email"
                label={t("signup.email_label")}
                type="email"
                autoComplete="email"
                error={formik.errors.email}
                touched={formik.touched.email}
                {...formik.getFieldProps("email")}
              />

              {/* PASSWORD */}
              <div>
                <FormInput
                  id="password"
                  label={t("signup.password_label")}
                  type="password"
                  autoComplete="new-password"
                  error={formik.errors.password}
                  touched={formik.touched.password}
                  {...formik.getFieldProps("password")}
                />

                <PasswordStrength password={formik.values.password} />
              </div>

              {/* CONFIRM PASSWORD */}
              <FormInput
                id="confirmPassword"
                label={t("signup.confirm_password_label")}
                type="password"
                autoComplete="new-password"
                error={formik.errors.confirmPassword}
                touched={formik.touched.confirmPassword}
                {...formik.getFieldProps("confirmPassword")}
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
                    {t("signup.creating_account")}
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    {t("signup.submit_button")}
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-muted-foreground mt-3">
          {t("signup.login_prompt")}{" "}
          <Link to="/login" className="text-primary hover:underline">
            {t("signup.login_link")}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}