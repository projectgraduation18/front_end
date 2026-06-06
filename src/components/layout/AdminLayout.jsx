import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Content */}
      <div
        className={`
          transition-all duration-500 ease-in-out
          p-6

          ${
            isArabic
              ? `
                mr-[72px]
                ${sidebarOpen ? "lg:mr-[220px]" : "lg:mr-[72px]"}
              `
              : `
                ml-[72px]
                ${sidebarOpen ? "lg:ml-[220px]" : "lg:ml-[72px]"}
              `
          }
        `}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;