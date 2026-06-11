import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getSubjectMaterials,
  createMaterial,
  removeMaterial,
} from "../../redux/slices/materialSlice";

import { useIsArabic } from "../../lib/utils";

const SubjectDetails = () => {
  const { subjectId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  /* ================= REDUX AUTH ================= */
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isAdmin =
    isAuthenticated && user?.role?.toLowerCase() === "admin";

  /* ================= MATERIALS ================= */
  const { materialsBySubjectId } = useSelector((state) => state.materials);
   
  const { subjects } = useSelector((state) => state.subjects);

  const subject = subjects?.find((s) => s.id === subjectId) || JSON.parse(localStorage.getItem("currentSubject")) || {};
   localStorage.setItem("currentSubject", JSON.stringify(subject));
  const materials = materialsBySubjectId[String(subjectId)] || [];
 
  const [file, setFile] = useState(null);
  const [lectureNumber, setLectureNumber] = useState("");
  const [progress, setProgress] = useState(0);

  const isArabic = useIsArabic();

  /* ================= FETCH ================= */
  useEffect(() => {
    if (subjectId) {
      dispatch(getSubjectMaterials(subjectId));
    }
  }, [subjectId, dispatch]);

  /* ================= DROPZONE ================= */
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  /* ================= UPLOAD ================= */
  const handleUpload = () => {
    if (!file || !lectureNumber) return;

    setProgress(0);

    dispatch(
      createMaterial({
        subjectId,
        file,
        lectureNumber,
        onProgress: (p) => setProgress(p),
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Upload completed successfully 🎉");
        setFile(null);
        setLectureNumber("");
        setProgress(0);
      })
      .catch(() => {
        toast.error("Upload failed ❌");
      });
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    dispatch(removeMaterial({ subjectId, materialId: id }));
  };

  return (
    <div className="min-h-screen p-6 container mx-auto">

      <ToastContainer />

      {/* HEADER */}
      <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isArabic ? subject?.titleAr : subject?.title}
        </h1>

        <div className="flex gap-3 mt-3 text-sm text-gray-600 dark:text-gray-300">
          <span>
            {isArabic ? "الرمز" : "Code"} : {subject?.code}
          </span>

          <span>
            {isArabic ? "المستوى" : "Level"} : {subject?.level}
          </span>

          <span>
            {isArabic ? "القسم" : "Dept"} :
            {subject?.department || (isArabic ? "عام" : "General")}
          </span>
        </div>
      </div>

      {/* UPLOAD */}
      {isAdmin && (
        <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">

          <input
            type="number"
            placeholder={isArabic ? "رقم المحاضرة" : "Lecture Number"}
            value={lectureNumber}
            min="1"
            max="40"
            onChange={(e) => setLectureNumber(e.target.value)}
            className="w-full mb-3   p-2 border rounded"
          />

          {/* DROPZONE */}
          <div
            {...getRootProps()}
            className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer mb-3
              ${
                isDragActive
                  ? "bg-blue-100"
                  : "bg-gray-50 dark:bg-gray-700"
              }`}
          >
            <input {...getInputProps()} />

            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>
                {isArabic
                  ? "اسحب ملفاً أو انقر للاختيار"
                  : "Drag & drop file here or click"}
              </p>
            )}
          </div>

          {/* PROGRESS */}
          {progress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
          >
            {t("upload_file")}
          </button>
        </div>
      )}

      {/* MATERIALS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((m) => (
          <div
            key={m.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900 dark:text-white">
                {isArabic ? "المحاضرة" : "Lecture"}{" "}
                {m.lectureNumber || "N/A"}
              </h2>

              <a
                href={m.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600"
              >
                {isArabic ? "عرض المحتوى" : "View Material"}
              </a>
            </div>

            {isAdmin && (
              <button
                onClick={() => handleDelete(m.id)}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg"
              >
                {isArabic ? "حذف" : "Delete"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectDetails;





