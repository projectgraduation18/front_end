const LectureCard = ({ lecture, lectureIndex }) => {
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

          {/* <div className="text-gray-500 dark:text-gray-400 text-sm mt-1 ml-7">
            ⏱️ {lecture.duration}
          </div> */}

        </div>
 
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition text-sm">
          Download Lecture File
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition text-sm">
          Summary & Questions
        </button>

      </div>

      
    </div>
  );
};

export default LectureCard;