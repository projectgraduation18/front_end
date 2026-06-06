// import axios from "axios";

// const BASE_URL = "https://projectgraduation18.runasp.net/api";



// export const getSubjectMaterialsService = async (subjectId) => {

//   const token = document.cookie
//     ?.split("; ")
//     .find(row => row.startsWith("token="))
//     ?.split("=")[1];



//   const response = await axios.get(
//     `${BASE_URL}/subjects/${subjectId}/materials`,
//     {
//       headers: {
//         ...(token && { Authorization: `Bearer ${token}` }),
//       },
//     }
//   );

//   return response.data;
// };

import axios from "axios";

const BASE_URL = "https://projectgraduation18.runasp.net/api";

// ================= TOKEN =================
const getToken = () => {
  return document.cookie
    ?.split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
};

// ================= GET MATERIALS =================
export const getSubjectMaterialsService = async (subjectId) => {
  const token = getToken();

  const response = await axios.get(
    `${BASE_URL}/subjects/${subjectId}/materials`,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );

  return response.data;
};

// ================= ADD MATERIAL =================
export const addMaterial = async (
  subjectId,
  file,
  lectureNumber,
  onUploadProgress
) => {
  const token = getToken();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("lectureNumber", lectureNumber);

  const response = await axios.post(
    `${BASE_URL}/subjects/${subjectId}/materials`,
    formData,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      onUploadProgress,
    }
  );

  return response.data;
};
// ================= DELETE MATERIAL =================
export const deleteMaterial = async (materialId,subjectId) => {
  const token = getToken();

  const response = await axios.delete(
    `${BASE_URL}/subjects/${subjectId}/materials/${materialId}`,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );

  return response.data;
};