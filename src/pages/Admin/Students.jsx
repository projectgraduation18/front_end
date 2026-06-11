// import { useState } from "react";
// import { students } from "../../../utils/adminData";
// import { useIsArabic } from "../../lib/utils";

// function Students() {
//   const isArabic = useIsArabic();

//   const [search, setSearch] = useState("");

//   // Filter students
//   const filteredStudents = students.filter((student) => {
//     return (
//       student.name.toLowerCase().includes(search.toLowerCase()) ||
//       student.email.toLowerCase().includes(search.toLowerCase()) ||
//       String(student.id).includes(search)
//     );
//   });

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8">
//         {isArabic ? "الطلاب" : "Students"}
//       </h1>

//       <input
//         className="w-full px-3 py-4 mb-6 rounded-xl
//         bg-input text-foreground
//         border border-border outline-none
//         focus:ring-2 focus:ring-ring"
//         type="search"
//         placeholder={isArabic ? "ابحث عن طالب..." : "Search student..."}
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//     <div className="overflow-x-auto rounded-xl border border-border">
//   <table className="w-full text-sm text-left rtl:text-right">
//     <thead className="bg-muted border-b border-border">
//       <tr>
//         <th className="p-4">
//           {isArabic ? "الرقم" : "ID"}
//         </th>

//         <th className="p-4">
//           {isArabic ? "الاسم" : "Name"}
//         </th>

//         <th className="p-4">
//           {isArabic ? "البريد الإلكتروني" : "Email"}
//         </th>
//       </tr>
//     </thead>

//     <tbody>
//       {filteredStudents.length > 0 ? (
//         filteredStudents.map((student) => (
//           <tr
//             key={student.id}
//             className="border-b border-border hover:bg-muted/50 transition-colors"
//           >
//             <td className="p-4">{student.id}</td>
//             <td className="p-4 font-medium">
//               {student.name}
//             </td>
//             <td className="p-4">
//               {student.email}
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td
//             colSpan={3}
//             className="p-6 text-center text-gray-500"
//           >
//             {isArabic
//               ? "لا يوجد طلاب مطابقون للبحث"
//               : "No students found"}
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// </div>
//     </div>
//   );
// }

// export default Students;












import { useState } from "react";
import { students } from "../../../utils/adminData";
import { useIsArabic } from "../../lib/utils";

function Students() {
  const isArabic = useIsArabic();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 10;

  // Filter students
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      String(student.id).includes(search)
    );
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {isArabic ? "الطلاب" : "Students"}
      </h1>

      <input
        className="w-full px-3 py-4 mb-6 rounded-xl
        bg-input text-foreground
        border border-border outline-none
        focus:ring-2 focus:ring-ring"
        type="search"
        placeholder={
          isArabic
            ? "ابحث عن طالب..."
            : "Search student..."
        }
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="p-4">
                {isArabic ? "الرقم" : "ID"}
              </th>

              <th className="p-4">
                {isArabic ? "الاسم" : "Name"}
              </th>

              <th className="p-4">
                {isArabic
                  ? "البريد الإلكتروني"
                  : "Email"}
              </th>
            </tr>
          </thead>

          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4">
                    {student.id}
                  </td>

                  <td className="p-4 font-medium">
                    {student.name}
                  </td>

                  <td className="p-4">
                    {student.email}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="p-6 text-center text-gray-500"
                >
                  {isArabic
                    ? "لا يوجد طلاب مطابقون للبحث"
                    : "No students found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            {isArabic ? "السابق" : "Previous"}
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === index + 1
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            {isArabic ? "التالي" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Students;