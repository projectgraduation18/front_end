import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  ShieldCheck,
  Loader2,
  ArrowLeft,
  Mail,
} from "lucide-react";

import { forgotPassword } from "../redux/slices/authSlice";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { useIsArabic } from "../lib/utils";

export default function VerificationCode() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const { passwordLoading, passwordMessage } = useSelector(
    (state) => state.auth
  );

  const isArabic = useIsArabic()
  /* ================= VERIFY ================= */
  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length < 6) return;

    try {
      setLoading(true);

      // 🔥 TODO: replace with real API later
      await new Promise((r) => setTimeout(r, 1000));

      navigate("/reset-password", {
        state: {
          email,
          otpCode: otp,
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESEND ================= */
  const handleResend = async () => {
    if (!email) return;

    const result = await dispatch(forgotPassword(email));

    if (result.meta.requestStatus === "fulfilled") {
      console.log("Code resent successfully");
    } else {
      console.log("Failed to resend code");
    }
  };

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen flex items-center justify-center bg-background px-4 py-12"
    >
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary shadow-lg shadow-primary/20">
            <ShieldCheck className="w-7 h-7 text-primary-foreground" />
          </div>

          <h1 className="text-2xl font-bold">
            {t("verification.title")}
          </h1>

          <p className="text-sm text-muted-foreground mt-2">
            {t("verification.subtitle")}
          </p>

          <p className="text-sm font-medium mt-2">
            {email}
          </p>
        </div>

        {/* CARD */}
        <div className="bg-card border rounded-2xl p-8 shadow-sm">

          {/* OTP ERROR MESSAGE */}
          {passwordMessage && (
            <div className="text-sm text-center mb-3 text-primary">
              {passwordMessage}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-8">

            {/* OTP */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>

                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* RESEND */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={passwordLoading}
                className="text-sm text-primary flex items-center gap-2 mx-auto"
              >
                {passwordLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isArabic ? "إعادة إرسال..." : "Resending..."}
                   </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    {isArabic ? "إعادة إرسال الرمز" : "Resend Code"}
                  </>
                )}
              </button>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg"
            >
              {loading ? (isArabic ? "جاري التحقق..." : "Verifying...") : (isArabic ? "تحقق" : "Verify")}
            </button>
          </form>
        </div>

        {/* BACK */}
        <div className="flex justify-center mt-6">
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
             {isArabic ? "العودة إلى تسجيل الدخول" : "Back to Login"}
          </Link>
        </div>
      </div>
    </div>
  );
}