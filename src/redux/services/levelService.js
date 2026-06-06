// services/levelService.js

import axios from "axios";

const BASE_URL = "https://projectgraduation18.runasp.net/api";



export const getLevelsService = async () => {

    const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];



  const response = await axios.get(
    `${BASE_URL}/Levels`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  return response.data;
};