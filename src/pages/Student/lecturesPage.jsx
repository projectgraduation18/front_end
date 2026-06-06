import  { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lecturesData } from "../../../utils/lecturesData";
import SubjectCard from "../../../components/SubjectCard";
import LectureCard from "../../../components/LectureCard";
const LecturesPage = () => {
  const { levelId, categoryId } = useParams();
  const navigate = useNavigate();
  const [expandedSubject, setExpandedSubject] = useState(null);

  const level = parseInt(levelId);

  const getData = () => {
    if ((level === 1 || level === 2) && lecturesData[level]) {
      return {
        title: lecturesData[level].title,
        subjects: lecturesData[level].subjects,
        hasCategory: false,
      };
    }

    if (
      (level === 3 || level === 4) &&
      categoryId &&
      lecturesData[level]?.categories?.[categoryId]
    ) {
      return {
        title: `${lecturesData[level].title} - ${
          lecturesData[level].categories[categoryId].name
        }`,
        subjects: lecturesData[level].categories[categoryId].subjects,
        hasCategory: true,
        categoryName: categoryId.toUpperCase(),
      };
    }

    return null;
  };

  const data = getData();

  const getTotalStats = (subjects) => {
    let totalLectures = 0;
    let totalMinutes = 0;

    subjects.forEach((subject) => {
      totalLectures += subject.lectures.length;

      subject.lectures.forEach((lecture) => {
        const [minutes] = lecture.duration.split(":").map(Number);
        totalMinutes += minutes;
      });
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return {
      totalLectures,
      totalDuration: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
    };
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
        <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border dark:border-gray-800">
          <h1 className="text-3xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No data found for Level {level}{" "}
            {categoryId && `- Category: ${categoryId}`}
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Back to Levels
          </button>
        </div>
      </div>
    );
  }

  const stats = getTotalStats(data.subjects);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 py-8 px-4 pt-20 transition-colors">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 mb-8 border dark:border-gray-800">
          <div className="flex justify-between items-start flex-wrap gap-4">

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                {data.title}
              </h1>

              <p className="text-gray-600 dark:text-gray-300">
                📚 {stats.totalLectures} subjects
              </p>

              {data.hasCategory && (
                <span className="inline-block mt-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                  Department : {data.categoryName}
                </span>
              )}
            </div>

            <button
              onClick={() => navigate("/level")}
              className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg transition"
            >
              ← Back to Levels
            </button>
          </div>
        </div>

        {/* SUBJECTS */}
        <div className="space-y-6">
          {data.subjects.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              index={index}
              isExpanded={expandedSubject === subject.id}
              onToggle={() =>
                setExpandedSubject(
                  expandedSubject === subject.id
                    ? null
                    : subject.id
                )
              }
              levelId={level}
              categoryId={categoryId}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

 
export default LecturesPage;