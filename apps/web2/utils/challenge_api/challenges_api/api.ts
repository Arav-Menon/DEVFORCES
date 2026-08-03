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
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchChallenges = async (contestId: string) => {
  const response = await axiosInstence.get(`/api/v1/contest/${contestId}/challenges`);
  return response.data.challenges;
};

export const fetchChallenge = async (contestId: string, slug: string) => {
  const response = await axiosInstence.get(`/api/v1/contest/${contestId}/challenges`);
  const challenges: any[] = response.data.challenges;
  return challenges.find((c) => c.slug === slug) ?? null;
};