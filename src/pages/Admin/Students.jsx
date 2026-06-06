import { students } from "../../../utils/adminData";

function Students() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Students
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {students.map((student) => (
          <div
            key={student.id}
            className="border dark:border-gray-700 p-5 rounded-xl"
          >

            <h2 className="text-xl font-bold">
              {student.name}
            </h2>

            <p className="mt-2">
              {student.email}
            </p>

            <p className="mt-2">
              {student.level}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Students;