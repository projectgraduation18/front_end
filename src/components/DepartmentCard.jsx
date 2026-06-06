import { useTranslation } from "react-i18next";
 import { useSelector } from "react-redux";

const DepartmentCard = ({ department, onSelect }) => {
  const { t } = useTranslation();

   const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isAdmin = isAuthenticated && user?.role?.toLowerCase() === "admin";

  if (isAdmin) {
   return (
  <div className="relative overflow-hidden rounded-2xl group w-full h-[180px] md:h-[200px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-white dark:bg-gray-800">
    
    {/* Background layer */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40" />

    <div className="relative z-10 flex items-center justify-between h-full p-6 text-gray-900 dark:text-white">
      
      {/* Top Section */}
      <div>
        <div className="text-4xl mb-3">{department.icon}</div>

        <h2 className="text-xl font-bold">
          {t(department.nameKey)}
        </h2>
      </div>

      {/* Button */}
      <div>
        <button
          onClick={() => onSelect(department)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          دخول
        </button>
      </div>
    </div>
  </div>
);
  }

  return (
    <div
      onClick={() => onSelect(department)}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="text-6xl mb-4">{department.icon}</div>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        {t(department.nameKey)}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {t(department.descKey)}
      </p>

      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        {t("select")} → {t(department.nameKey)}
      </button>
    </div>
  );
};

export default DepartmentCard;