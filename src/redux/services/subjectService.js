// services/subjectService.js

import axios from "axios";

const BASE_URL = "https://projectgraduation18.runasp.net/api";



// Get subjects by levelId
export const getSubjectsByLevelService = async (levelId, department) => {

    const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];

  const response = await axios.get(
    `${BASE_URL}/Levels/${levelId}/subjects`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
       params: {
        department: department,
      },
    }
  );

  return response.data;
};
