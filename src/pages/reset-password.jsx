import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader2, KeyRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "@/components/FormInput";
import { resetPassword } from "../redux/slices/authSlice";
import { useIsArabic } from "../lib/utils";
export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { passwordLoading, passwordMessage } = useSelector(
    (state) => state.auth
  );

  const isArabic = useIsArabic();
  const email = location.state?.email || "";
  const otpCode = location.state?.otpCode || "";

  const formik = useFormik({
    initialValues: {
      email,
      otpCode,
      newPassword: "",
    },

    enableReinitialize: true,

    validationSchema: Yup.object({
      email: Yup.string().required("Email required"),
      otpCode: Yup.string().required("OTP required"),
      newPassword: Yup.string()
        .min(8, "Min 8 characters")
        .required("Password required"),
    }),

    onSubmit: async (values) => {
      if (!values.email || !values.otpCode || !values.newPassword) return;

      const result = await dispatch(
        resetPassword({
          email: values.email,
          otpCode: values.otpCode,
          newPassword: values.newPassword,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-4">
          <KeyRound className="w-10 h-10 mx-auto text-primary" />
          <h1 className="text-2xl font-bold mt-2">
             {isArabic ? "إعادة تعيين كلمة المرور" : "Reset Password"}
          </h1>
        </div>

        {/* CARD */}
        <div className="bg-card border rounded-2xl p-8">

          {passwordMessage && (
            <div className="mb-3 text-sm text-center text-red-500">
              {passwordMessage}
              
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <FormInput
              id="email"
              label={isArabic ? "البريد الإلكتروني" : "Email"}
              readOnly
              {...formik.getFieldProps("email")}
            />

            {/* OTP */}
            <FormInput
              id="otpCode"
              label={isArabic ? "رمز التحقق" : "OTP Code"}
              readOnly
              {...formik.getFieldProps("otpCode")}
            />

            {/* NEW PASSWORD */}
            <FormInput
              id="newPassword"
              label={isArabic ? "كلمة المرور الجديدة" : "New Password"}
              type="password"
              {...formik.getFieldProps("newPassword")}
              error={formik.errors.newPassword}
              touched={formik.touched.newPassword}
            />

            {/* BUTTON */}
            <button
                type="submit"
                disabled={passwordLoading}
                className="w-full bg-primary text-white py-2.5 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                {passwordLoading ? (
                    <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isArabic ? "جاري الحفظ..." : "Saving..."}
                    </>
                ) : (
                    isArabic ? "إعادة تعيين كلمة المرور" : "Reset Password"
                )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}