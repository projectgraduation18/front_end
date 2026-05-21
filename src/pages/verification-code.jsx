import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  ShieldCheck,
  Loader2,
  ArrowLeft,
  Mail,
} from "lucide-react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";

export default function VerificationCode() {
  const { t, i18n } = useTranslation();

  const location = useLocation();

  const email =
    location.state?.email || "example@email.com";

  const [otp, setOtp] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length < 6) return;

    try {
      setLoading(true);

      // API Request هنا
      await new Promise((r) =>
        setTimeout(r, 1500)
      );

      console.log("OTP:", otp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);

      // resend API

      await new Promise((r) =>
        setTimeout(r, 1400)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setResending(false);
    }
  };

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="
        min-h-screen
        flex items-center justify-center
        bg-background
        px-4 py-12
      "
    >
      <div className="w-full max-w-md">
        {/* header */}
        <div className="text-center mb-4">
          <div
            className="
              inline-flex
              items-center justify-center
              w-14 h-14
              rounded-2xl
              bg-primary
              shadow-lg shadow-primary/20
             "
          >
            <ShieldCheck
              className="
                w-7 h-7
                text-primary-foreground
              "
            />
          </div>

          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-foreground
            "
          >
            {t("verification.title")}
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-muted-foreground
              leading-relaxed
            "
          >
            {t("verification.subtitle")}
          </p>

          <p
            className="
              mt-2
              text-sm
              font-medium
              text-foreground
            "
          >
            {email}
          </p>
        </div>

        {/* card */}
        <div
          className="
            bg-card
            border border-border
            rounded-2xl
            shadow-sm
            p-8
          "
        >
          <form
            onSubmit={handleVerify}
            className="space-y-8"
          >
            {/* otp */}
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

            {/* resend */}
            <div className="text-center">
              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                {t("verification.didntReceive")}
              </p>

              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="
                  mt-1
                  inline-flex
                  items-center
                  gap-2

                  text-sm
                  font-medium
                  text-primary

                  hover:underline

                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {resending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t(
                      "verification.resending"
                    )}
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    {t(
                      "verification.resend"
                    )}
                  </>
                )}
              </button>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={
                loading || otp.length < 6
              }
              className="
                w-full

                flex items-center justify-center
                gap-2

                rounded-lg

                bg-primary
                text-primary-foreground

                py-2.5 px-4

                text-sm
                font-medium

                transition-all
                duration-150

                hover:opacity-90
                active:scale-[0.98]

                disabled:opacity-60
                disabled:cursor-not-allowed

                shadow-sm
                shadow-primary/20
              "
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("verification.verifying")}
                </>
              ) : (
                t("verification.verify")
              )}
            </button>
          </form>
        </div>

        {/* back */}
        <div className="flex justify-center mt-6">
          <Link
            to="/login"
            className="
              flex items-center
              gap-1.5

              text-sm
              text-muted-foreground

              hover:text-foreground

              transition-colors
            "
          >
            <ArrowLeft className="w-3.5 h-3.5" />

            {t("verification.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}