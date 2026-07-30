import axios from "axios";
import { API_URL } from "@/utils/api_url";

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
    config.headers.Authorization = token;
  }
  return config;
});

export const fetcfdshContest = async () => {
  const response = await axiosInstence.get("/api/v1/contests");
  return response.data.contests;
};

export const createContest = async (
  title: string,
  slug: string,
  startTime: string,
) => {
  const response = await axiosInstence.post("/api/v1/contest/create", {
    title,
    slug,
    startTime,
  });
  return response.data;
};
