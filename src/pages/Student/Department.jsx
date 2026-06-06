// CategoryPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Department = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const departments = [
    {
      id: "cs",
      nameKey: "departments.cs.name",
      descKey: "departments.cs.description",
      icon: "💻",
    },
    {
      id: "is",
      nameKey: "departments.is.name",
      descKey: "departments.is.description",
      icon: "📊",
    },
     {
      id: "it",
      nameKey: "departments.it.name",
      descKey: "departments.it.description",
      icon: "🌐",
    },
  ];

  const handleDepartmentSelect = (department) => {
    navigate(`/level/${levelId}/department/${department.id}/subjects`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 p-8 pt-20 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          {t("level")} {levelId}
        </h1>

        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          {t("chooseTrack")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departments.map((department) => (
            <div
              key={department.id}
              onClick={() => handleDepartmentSelect(department)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Department;