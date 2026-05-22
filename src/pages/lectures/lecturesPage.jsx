import  { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lecturesData } from "../../../utils/lecturesData";

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
                📚 {stats.totalLectures} lectures • ⏱️ Total duration:{" "}
                {stats.totalDuration}
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

/* =========================
   SUBJECT CARD
========================= */
const SubjectCard = ({
  subject,
  index,
  isExpanded,
  onToggle,
}) => {
  const totalDuration = subject.lectures.reduce((total, lecture) => {
    const [minutes] = lecture.duration.split(":").map(Number);
    return total + minutes;
  }, 0);

  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  const durationText =
    hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition border dark:border-gray-800">

      {/* HEADER */}
      <div
        onClick={onToggle}
        className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">

          <div className="flex items-center flex-1">
            <div className="text-4xl mr-4">{subject.icon}</div>

            <div className="flex-1">

              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </span>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {subject.name}
                </h3>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 ml-10">
                {subject.description}
              </p>

              <div className="flex gap-4 mt-2 ml-10 text-sm text-gray-500 dark:text-gray-400">
                <span>📹 {subject.lectures.length} lectures</span>
                <span>⏱️ {durationText}</span>
              </div>

            </div>
          </div>

          <div className="text-blue-600 dark:text-blue-400">
            {isExpanded ? "▲" : "▼"}
          </div>

        </div>
      </div>

      {/* LECTURES */}
      {isExpanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">

          <div className="space-y-3">
            {subject.lectures.map((lecture, lectureIndex) => (
              <LectureCard
                key={lecture.id}
                lecture={lecture}
                lectureIndex={lectureIndex}
              />
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

/* =========================
   LECTURE CARD
========================= */
const LectureCard = ({ lecture, lectureIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 hover:shadow-md transition border dark:border-gray-800">

      <div className="flex items-start justify-between flex-wrap gap-4">

        <div className="flex-1">

          <div className="flex items-center gap-3">
            <span className="text-gray-400 dark:text-gray-500 font-mono text-sm">
              #{lectureIndex + 1}
            </span>

            <h4 className="font-semibold text-gray-800 dark:text-white">
              {lecture.title}
            </h4>
          </div>

          <div className="text-gray-500 dark:text-gray-400 text-sm mt-1 ml-7">
            ⏱️ {lecture.duration}
          </div>

        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
        >
          {isPlaying ? "Pause" : "Watch"}
        </button>

      </div>

      {isPlaying && (
        <div className="mt-4">
          <video controls autoPlay className="w-full rounded-lg">
            <source src={lecture.videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

    </div>
  );
};

export default LecturesPage;