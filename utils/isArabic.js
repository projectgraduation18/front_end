import i18n from "i18next";

const isArabic = () => {
  return i18n.language === "ar";
};
export default isArabic;