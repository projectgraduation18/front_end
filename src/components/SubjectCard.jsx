import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectMaterials } from "../redux/slices/materialSlice";
import { useIsArabic } from "../lib/utils";
const SubjectCard = ({ subject, index }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const isArabic = useIsArabic();
  const dispatch = useDispatch();

  const { materialsBySubjectId, loading } = useSelector(
    (state) => state.materials
  );



  const materials = materialsBySubjectId?.[subject.id] || [];

  console.log (materials);


  const handleToggle = () => {

    const next = !isExpanded;
    setIsExpanded(next);

    // fetch only if opening + not cached
    if (next && materials.length === 0) {
      dispatch(getSubjectMaterials(subject.id));
    }

  };



  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition border dark:border-gray-800">

      {/* HEADER */}
      <div
        onClick={handleToggle}
        className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div className="flex items-center flex-1">

            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold w-8 h-8 rounded-full flex items-center justify-center text-sm mr-4">
              {index + 1}
            </span>

            <div className="flex-1 ms-4">

              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {isArabic ? subject.titleAr : subject.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {isArabic ? "الرمز" : "Code"} : {subject.code}
              </p>

              {subject.description && (
                <p className="text-gray-500 text-sm mt-2">
                  {subject.description}
                </p>
              )}

              <div className="flex gap-4 mt-2 text-sm text-gray-500">

                <span>📘    {isArabic ? "المستوى" : "Level"} : {subject.level}</span>
                <span>🏷️ {isArabic ? "القسم" : "Department"} : {subject.department ?? isArabic ? "عام" : "General"}</span>

              </div>

            </div>

          </div>

          <div className="text-blue-500">
            {isExpanded ? "▲" : "▼"}
          </div>

        </div>

      </div>

      {/* EXPAND */}
      {isExpanded && (
        <div className="border-t p-4 bg-gray-50 dark:bg-gray-950">

          {loading && materials.length === 0 ? (
            <p className="text-gray-500">Loading materials...</p>
          ) : (

            <div className="space-y-2">

              {materials.length === 0 ? (
                <p className="text-gray-500">No materials</p>
              ) : (
                materials.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm flex items-center justify-between"
                  >
                    <span>
                      📄 {m.fileName}
                    </span>

                    <a
                      href={m.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      {isArabic ? "مشاهدة" : "View"}
                    </a>
                  </div>
                ))
              )}

            </div>

          )}

        </div>
      )}

    </div>
  );
};

export default SubjectCard;








 