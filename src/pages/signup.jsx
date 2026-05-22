// src/pages/SignupPage.jsx
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
import {
  registerUser,
  resetAuthState,
  clearError,
} from "../redux/slices/authSlice";

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
          className={`flex items-center gap-1 text-xs transition-colors ${
            c.ok ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Check
            className={`w-3 h-3 ${
              c.ok ? "text-primary" : "text-muted-foreground/40"
            }`}
          />
          {c.label}
        </span>
      ))}
    </div>
  );
}

export default function SignupPage() {
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
    terms: Yup.boolean()
      .oneOf([true], t("validation.terms_accepted"))
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(clearError());
      const result = await dispatch(
        registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      );
      setSubmitting(false);

      if (result.meta.requestStatus === "rejected") {
        console.error("Registration failed:", result.payload);
      }
    },
  });

  return (
    <motion.div
      {...fadeUp(0)}
      className="min-h-screen flex items-center justify-center px-4 md:py-18 bg-background"
    >
      <div className="w-full max-w-md">
        <div className="mb-2 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary shadow-lg shadow-primary/30">
            <UserPlus className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {t("signup.title")}
          </h1>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
          {showSuccess ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                {t("signup.account_created")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t("signup.welcome_message", { name: formik.values.name })}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {t("signup.redirecting") || "جاري تحويلك إلى لوحة التحكم..."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={formik.handleSubmit}
              noValidate
              className="space-y-4"
            >
              {/* عرض رسالة الخطأ */}
              {isError && message && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {message}
                </div>
              )}

              <FormInput
                id="name"
                label={t("signup.name_label")}
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                required
                error={formik.errors.name}
                touched={formik.touched.name}
                {...formik.getFieldProps("name")}
              />

              <FormInput
                id="email"
                label={t("signup.email_label")}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                error={formik.errors.email}
                touched={formik.touched.email}
                {...formik.getFieldProps("email")}
              />

              <div className="flex flex-col gap-1.5">
                <FormInput
                  id="password"
                  label={t("signup.password_label")}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  error={formik.errors.password}
                  touched={formik.touched.password}
                  {...formik.getFieldProps("password")}
                />
                <PasswordStrength password={formik.values.password} />
              </div>

              <FormInput
                id="confirmPassword"
                label={t("signup.confirm_password_label")}
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                required
                error={formik.errors.confirmPassword}
                touched={formik.touched.confirmPassword}
                {...formik.getFieldProps("confirmPassword")}
              />

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  {t("signup.terms_agreement")}{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    {t("signup.terms_link")}
                  </Link>
                </label>
              </div>
              {formik.errors.terms && formik.touched.terms && (
                <p className="text-xs text-red-500">{formik.errors.terms}</p>
              )}

              <button
                type="submit"
                disabled={formik.isSubmitting || isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm py-2.5 px-4 transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm shadow-primary/20 mt-2"
              >
                {formik.isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />{" "}
                    {t("signup.creating_account")}
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" /> {t("signup.submit_button")}
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-3">
          {t("signup.login_prompt")}{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            {t("signup.login_link")}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
