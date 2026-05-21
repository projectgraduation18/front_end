import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function LanguageDirection({ children }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = i18n.language;

    document.documentElement.lang = currentLanguage;

    if (currentLanguage === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [i18n.language]);

  return children;
}

export default LanguageDirection;