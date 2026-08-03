import axios from "axios";
import { API_URL } from "../api_url";

const axiosInstence = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstence.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const codeSubmission = async (
  contestId: string,
  challengeId: string,
  code: string,
  language: string,
) => {
  const response = await axiosInstence.post(
    `/api/v1/challenge/submit/${contestId}/${challengeId}`,
    { code, language },
  );
  console.log(response.data.message);
  return response.data;
};
