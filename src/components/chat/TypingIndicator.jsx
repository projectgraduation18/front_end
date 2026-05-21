import { useTranslation } from "react-i18next";

export default function TypingIndicator() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-start">
      <div className="bg-card border border-border px-4 py-2 rounded-2xl text-sm animate-pulse">
        {t("chat.typing")}
      </div>
    </div>
  );
}


