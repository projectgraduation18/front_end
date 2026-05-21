import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, Loader2 } from "lucide-react";
import FormInput from "@/components/FormInput";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/utils";
import { useTranslation } from "react-i18next";

 
export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false);
  const {t}=useTranslation();

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
    onSubmit: async (_values, { setSubmitting }) => {
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitting(false);
      setSubmitted(true);
    },
  });

 
  return (
    <motion.div {...fadeUp(0)} className=" h-[100vh]  flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="mb-3 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-2 shadow-lg shadow-primary/30">
            <LogIn className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{t("login.title")}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{t("login.subtitle")}</p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
                <LogIn className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Signed in successfully</h2>
              <p className="text-sm text-muted-foreground mt-1">You are now logged in.</p>
              <button
                onClick={() => { setSubmitted(false); formik.resetForm(); }}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Sign in again
              </button>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
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
                  <Link to="/forgot-password" className="text-primary hover:underline">
                    {t("login.forget_password")}
                  </Link>
                }
                {...formik.getFieldProps("password")}
              />
 
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm py-2.5 px-4 transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm shadow-primary/20"
              >
                {formik.isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                ) : (
                  <><LogIn className="w-4 h-4" /> {t("login.submit_button")}</>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
           {t("login.signup_prompt")}{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            {t("login.signup_link")}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
