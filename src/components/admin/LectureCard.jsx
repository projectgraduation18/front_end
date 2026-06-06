function LectureCard({ lecture }) {
  return (
    <div className="border dark:border-gray-700 p-5 rounded-xl">

      <h2 className="text-xl font-bold mb-5">
        {lecture.title}
      </h2>

      <div className="flex gap-3">

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit
        </button>

        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>

      </div>

    </div>
  );
}

export default LectureCard;