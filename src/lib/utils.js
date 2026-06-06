import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export const useIsArabic = () => {
  const { i18n } = useTranslation();
  return i18n.language === "ar";
};