import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import {
  Mail,
  Loader2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import FormInput from "@/components/FormInput";
import { forgotPassword } from "../redux/slices/authSlice";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        const result = await dispatch(forgotPassword(values.email));

        if (result.meta.requestStatus === "fulfilled") {
          setSubmitted(true);

          navigate("/verification-code", {
            state: {
              email: values.email,
            },
          });
        }
      } catch (err) {
        console.error(err);
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

        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-4 shadow-lg shadow-primary/30">
            <ShieldCheck className="w-6 h-6 text-primary-foreground" />
          </div>

          <h1 className="text-2xl font-bold">
            {t("forgotPassword.title")}
          </h1>

          <p className="mt-1.5 text-sm text-muted-foreground">
            {t("forgotPassword.subtitle")}
          </p>
        </div>

        {/* CARD */}
        <div className="bg-card rounded-2xl border p-8">

          {submitted ? (
            <div className="text-center">
              <h2 className="font-semibold">
                {t("forgotPassword.verificationSent")}
              </h2>
            </div>

          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-5">

              <FormInput
                id="email"
                label={t("forgotPassword.emailLabel")}
                type="email"
                {...formik.getFieldProps("email")}
                error={formik.errors.email}
                touched={formik.touched.email}
              />

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg"
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

        {/* BACK */}
        <div className="flex justify-center mt-6">
          <Link to="/login" className="text-sm text-muted-foreground">
            <ArrowLeft className="w-4 h-4 inline" /> Back
          </Link>
        </div>

      </div>
    </div>
  );
}