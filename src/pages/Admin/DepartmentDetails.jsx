import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DepartmentCard from "../../components/DepartmentCard";

const DepartmentDetails = () => {
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
    navigate(
      `/admin/levels/${levelId}/department/${department.id}/subjects`
    );
  };

  return (
    <div className="">
      <div className="">

        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          {t("level")} {levelId}
        </h1>

        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          {t("chooseTrack")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
              onSelect={handleDepartmentSelect}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default DepartmentDetails;