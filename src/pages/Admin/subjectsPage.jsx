import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSubjectsByLevel } from "../../redux/slices/subjectSlice";
import {Spinner} from "../../components/ui/spinner"
import { useTranslation } from "react-i18next";
import {useIsArabic} from "../../lib/utils"
const SubjectsPage = () => {

 const isArabic = useIsArabic();
  const { levelId, departmentId } = useParams(); // categoryId = departmentId
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { subjects, loading, error, fetched } = useSelector(
    (state) => state.subjects
  );
console.log(subjects)


  useEffect(() => {

    if (levelId) {
      dispatch(
        getSubjectsByLevel({
          levelId,
          department: departmentId, // 👈 مهم
        })
      );
    }

  }, [dispatch, levelId, departmentId]);


 if (loading) {
    return<Spinner className="size-20 dark:text-white" />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }


return (
  <div className="min-h-screen p-6 container mx-auto">

    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
      {t("subjects")}
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {subjects?.map((subject) => (
        <div
          key={subject.id}
          onClick={() => navigate(`/admin/subjects/${subject.id}`)}
          className="cursor-pointer relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-gray-700"
        >

          {/* Header */}
          <div className="flex items-start justify-between mb-3">

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {isArabic ? subject.titleAr : subject.title}
              </h2>

              <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                {subject.code}
              </p>
            </div>

            <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg">
 
              {isArabic ? "المستوي" : "Level"} {subject.level}
            </span>

          </div>         
        </div>
      ))}

    </div>

  </div>
);
};

export default SubjectsPage;