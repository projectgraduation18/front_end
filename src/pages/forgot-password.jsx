import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Mail,
  Loader2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import FormInput from "@/components/FormInput";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [submitted, setSubmitted] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("forgotPassword.validation.emailInvalid"))
      .required(t("forgotPassword.validation.emailRequired")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await new Promise((r) =>
          setTimeout(r, 1400)
        );

        setSubmitted(true);

        navigate("/verification-code", {
          state: {
            email: values.email,
          },
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-background"
    >
      <div className="w-full max-w-md">
        {/* header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-4 shadow-lg shadow-primary/30">
            <ShieldCheck className="w-6 h-6 text-primary-foreground" />
          </div>

          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {t("forgotPassword.title")}
          </h1>

          <p className="mt-1.5 text-sm text-muted-foreground">
            {t("forgotPassword.subtitle")}
          </p>
        </div>

        {/* card */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-5 py-6">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-lg font-semibold text-foreground">
                  {t("forgotPassword.verificationSent")}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("forgotPassword.verificationText")}
                </p>

                <p className="text-sm font-medium text-foreground">
                  {formik.values.email}
                </p>
              </div>

              <div className="w-full rounded-xl bg-muted/60 border border-border p-4 text-xs text-muted-foreground space-y-2">
                <p className="font-medium text-foreground uppercase tracking-wide">
                  {t("forgotPassword.didntReceive")}
                </p>

                <ul className="space-y-1 list-disc list-inside">
                  <li>{t("forgotPassword.spamCheck")}</li>
                  <li>{t("forgotPassword.emailCorrect")}</li>
                  <li>{t("forgotPassword.waitTryAgain")}</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  formik.setSubmitting(true);

                  setTimeout(() => {
                    formik.setSubmitting(false);
                  }, 1400);
                }}
                disabled={formik.isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary text-secondary-foreground font-medium text-sm py-2.5 px-4 transition-all hover:bg-muted disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formik.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("forgotPassword.resendingCode")}
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    {t("forgotPassword.resendCode")}
                  </>
                )}
              </button>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
              <FormInput
                id="email"
                label={t("forgotPassword.emailLabel")}
                type="email"
                placeholder={t("forgotPassword.emailPlaceholder")}
                autoComplete="email"
                required
                hint={t("forgotPassword.emailHint")}
                error={formik.errors.email}
                touched={formik.touched.email}
                {...formik.getFieldProps("email")}
              />

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm py-2.5 px-4 transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm shadow-primary/20"
              >
                {formik.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("forgotPassword.sendingCode")}
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    {t("forgotPassword.sendCode")}
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* back */}
        <div className="flex justify-center mt-6">
          <Link
            to="/login"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t("forgotPassword.backToLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
}