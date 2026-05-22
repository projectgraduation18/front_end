// LecturesPage.jsx - نسخة بالمواد والمحاضرات
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lecturesData } from "../../../utils/lecturesData";

const LecturesPage = () => {
  const { levelId, categoryId } = useParams();
  const navigate = useNavigate();
  const [expandedSubject, setExpandedSubject] = useState(null);

  const level = parseInt(levelId);

  // جلب البيانات حسب level و categoryId
  const getData = () => {
    // Level 1 و 2 (ملهومش category)
    if ((level === 1 || level === 2) && lecturesData[level]) {
      return {
        title: lecturesData[level].title,
        subjects: lecturesData[level].subjects,
        hasCategory: false,
      };
    }

    // Level 3 و 4 (لهم category)
    if (
      (level === 3 || level === 4) &&
      categoryId &&
      lecturesData[level]?.categories?.[categoryId]
    ) {
      return {
        title: `${lecturesData[level].title} - ${lecturesData[level].categories[categoryId].name}`,
        subjects: lecturesData[level].categories[categoryId].subjects,
        hasCategory: true,
        categoryName: categoryId.toUpperCase(),
      };
    }

    return null;
  };

  const data = getData();

  // حساب إجمالي عدد المحاضرات والمدة
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-gray-600 mb-6">
            No data found for Level {level}{" "}
            {categoryId && `- Category: ${categoryId}`}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Levels
          </button>
        </div>
      </div>
    );
  }

  const stats = getTotalStats(data.subjects);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {data.title}
              </h1>
              <p className="text-gray-600">
                📚 {stats.totalLectures} lectures • ⏱️ Total duration:{" "}
                {stats.totalDuration}
              </p>
              {data.hasCategory && (
                <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Track: {data.categoryName}
                </span>
              )}
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
            >
              ← Back to Levels
            </button>
          </div>
        </div>

        {/* Subjects List */}
        <div className="space-y-6">
          {data.subjects.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              index={index}
              isExpanded={expandedSubject === subject.id}
              onToggle={() =>
                setExpandedSubject(
                  expandedSubject === subject.id ? null : subject.id,
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

// مكون المادة (Subject Card)
const SubjectCard = ({
  subject,
  index,
  isExpanded,
  onToggle,
  levelId,
  categoryId,
}) => {
  const totalDuration = subject.lectures.reduce((total, lecture) => {
    const [minutes] = lecture.duration.split(":").map(Number);
    return total + minutes;
  }, 0);

  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Subject Header - Clickable */}
      <div
        onClick={onToggle}
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center flex-1">
            <div className="text-4xl mr-4">{subject.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-blue-100 text-blue-700 font-semibold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                  {subject.name}
                </h3>
              </div>
              <p className="text-gray-500 text-sm mt-1 ml-10">
                {subject.description}
              </p>
              <div className="flex gap-4 mt-2 ml-10 text-sm text-gray-500">
                <span>📹 {subject.lectures.length} lectures</span>
                <span>⏱️ {durationText}</span>
              </div>
            </div>
          </div>

          <div className="text-blue-600">
            {isExpanded ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Lectures List - Appears when expanded */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-4">
          <div className="space-y-3">
            {subject.lectures.map((lecture, lectureIndex) => (
              <LectureCard
                key={lecture.id}
                lecture={lecture}
                lectureIndex={lectureIndex}
                subjectName={subject.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// مكون المحاضرة (Lecture Card)
const LectureCard = ({ lecture, lectureIndex, subjectName }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 font-mono text-sm">
              #{lectureIndex + 1}
            </span>
            <h4 className="font-semibold text-gray-800">{lecture.title}</h4>
          </div>
          <div className="flex items-center text-gray-500 text-sm mt-1 ml-7">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{lecture.duration}</span>
          </div>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition transform hover:scale-105 flex items-center text-sm"
        >
          {isPlaying ? (
            <>
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
              Watch
            </>
          )}
        </button>
      </div>

      {/* Video Player */}
      {isPlaying && (
        <div className="mt-4">
          <div className="bg-black rounded-lg overflow-hidden">
            <video
              controls
              autoPlay
              className="w-full"
              poster="https://via.placeholder.com/800x450.png?text=Now+Playing"
            >
              <source src={lecture.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturesPage;
