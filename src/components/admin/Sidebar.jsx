import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import {
  logoutUser,
} from "../../redux/slices/authSlice";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sun,
  Moon,
} from "lucide-react";

import { useDarkMode } from "@/hooks/use-dark-mode";
import LanguageDropdown from "../language-dropdown";
import { useTranslation } from "react-i18next";




function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isDark, toggle } = useDarkMode();
  const [open, setOpen] = useState(false);

  const { t,i18n } = useTranslation();
const isArabic = i18n.language === "ar";

  const handleLogout = async () => {
    await dispatch(logoutUser());
     navigate("/");
  };

  const linkClass = ({ isActive }) => `
    flex items-center gap-3
    px-3 py-2
    rounded-lg
    transition-all duration-200
    text-sm

    ${isActive
      ? "bg-primary text-white"
      : "hover:bg-gray-200 dark:hover:bg-gray-700"}
  `;

  const textClass = `
    whitespace-nowrap
    transition-all duration-300
    overflow-hidden
  `;

  const textState = open
    ? "opacity-100 ml-0"
    : "opacity-0 -ml-2 w-0";

  return (
    <div
     className={`
  fixed top-0 z-50

  h-screen

  bg-gray-100 dark:bg-gray-800
  flex flex-col justify-between

  overflow-hidden
  transition-all duration-500 ease-in-out

  shadow-xl

  ${open ? "w-[220px]" : "w-[72px]"}

  ${isArabic ? "right-0 border-l" : "left-0 border-r"}
`}>
      {/* ================= TOP ================= */}
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">

          <div className="flex items-center gap-2">
            <Shield size={20} className="text-primary" />

            <h1 className={`${textClass} ${textState} font-bold`}>
              {t("admin.title")}
            </h1>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="text-gray-600 dark:text-gray-300"
          >
            {open ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>

        {/* ================= SETTINGS ================= */}
        <div className="flex flex-col gap-2 p-2 border-b dark:border-gray-700">

          {/* Theme */}
          <button
            onClick={toggle}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}

            <span className={`${textClass} ${textState} ${!open && "hidden"}`}>
               {t("admin.theme")}
            </span>
          </button>

          {/* Language */}
          <div className="flex items-center py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <LanguageDropdown />

            <span className={`${textClass} ${textState} ${!open && "hidden"}`}>
                {t("admin.language")}
            </span>
          </div>
        </div>

        {/* ================= LINKS ================= */}
        <div className="flex flex-col gap-2 p-2">

          <NavLink to="/admin" end className={linkClass}>
            <LayoutDashboard size={20} />
            <span className={`${textClass} ${textState}`}>
              {t("admin.home")}
            </span>
          </NavLink>

          <NavLink to="/admin/students" className={linkClass}>
            <Users size={20} />
            <span className={`${textClass} ${textState}`}>
                {t("admin.students")}
            </span>
          </NavLink>

          <NavLink to="/admin/levels" className={linkClass}>
            <GraduationCap size={20} />
            <span className={`${textClass} ${textState}`}>
                {t("admin.levels")}
            </span>
          </NavLink>

        </div>
      </div>

      {/* ================= LOGOUT ================= */}
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-3
            bg-red-500 hover:bg-red-600
            text-white
            px-3 py-2
            rounded-lg
            w-full
            justify-center
            transition-all duration-300
          "
        >
          <LogOut size={20} />

          <span className={`${textClass} ${textState}`}>
            {t("admin.logout")}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;