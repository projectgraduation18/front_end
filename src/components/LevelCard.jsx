import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {useIsArabic} from "../lib/utils";
const LevelCard = ({ level, onViewDetails }) => {
  const { t } = useTranslation();

  const isArabic = useIsArabic();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isAdmin = isAuthenticated && user?.role?.toLowerCase() === "admin";

  if (isAdmin) {
    return (
      <div className="relative overflow-hidden rounded-2xl group w-full h-[150px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-white dark:bg-gray-800">

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40" />

        <div className="relative z-10 flex flex-col justify-between h-full p-4 md:p-6 text-gray-900 dark:text-white">

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              {isArabic ? `المستوى ${level.levelNumber}` : `Level ${level.levelNumber}`}
            </h3>
          </div>

          <div className="self-end">
            <button
              onClick={() => onViewDetails(level)}
              className="text-sm md:text-base bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg transition-all duration-300"
            >
              {t("levels.view_details")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl group w-full h-[300px] md:h-[250px]  transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">

      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-900" />

      <div className="relative z-10 flex flex-col justify-between h-full p-4 md:p-6 text-white">

        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">
             {isArabic ? `المستوى ${level.levelNumber}` : `Level ${level.levelNumber}`}
          </h3>

          <p className="text-sm md:text-base opacity-90 leading-relaxed line-clamp-4">
            { t(`levels.level_${level.levelNumber}_description`)}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">
              {level.subjectsCount} {isArabic ? "مادة" : "Subjects"}
            </span>
          </div>
        </div>

        <div className="self-end mt-4">
          <button
            onClick={() => onViewDetails(level)}
            className="text-sm md:text-base bg-blue-600 hover:bg-blue-700 px-4 md:px-6 py-2 md:py-2.5 rounded-lg transition-all duration-300"
          >
            {level.hasDepartments
              ? t("levels.choose_department")
              : t("levels.start_learning")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;