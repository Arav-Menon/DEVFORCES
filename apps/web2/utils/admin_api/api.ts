import axios from "axios";
import { API_URL } from "@/utils/api_url";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Contest {
  id: string;
  title: string;
  slug: string;
  startTime: string | null;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  createdById: string;
  createdAt: string;
  updatedAt: string;
  challenges?: Challenge[];
  createdBy?: {
    id: string;
    username: string;
  };
  _count?: {
    challenges: number;
  };
}

export interface ContestStats {
  totalChallenges: number;
  totalSubmissions: number;
  totalParticipants: number;
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  constraints: string;
  examples: any;
  allowedLanguages: string[];
  maxPoints: number;
  startAt: string;
  endAt: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  evaluationConfig: any;
  contestId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContestData {
  title: string;
  slug: string;
  startTime?: string;
  status?: string;
}

export interface UpdateContestData {
  title?: string;
  slug?: string;
  startTime?: string;
  status?: string;
}

export interface CreateChallengeData {
  title: string;
  slug: string;
  description: string;
  requirements: string;
  constraints: string;
  example: any;
  allowedLanguages: string[];
  maxPoint: number;
  startAt: string;
  endAt: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  evaluationConfig: any;
}

export interface UpdateChallengeData {
  title?: string;
  slug?: string;
  description?: string;
  requirements?: string;
  constraints?: string;
  example?: any;
  allowedLanguages?: string[];
  maxPoint?: number;
  startAt?: string;
  endAt?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  evaluationConfig?: any;
}

// Contest APIs
export const fetchContests = async (): Promise<Contest[]> => {
  const response = await axiosInstance.get("/api/v1/contests");
  return response.data.contests;
};

export const fetchContest = async (contestId: string): Promise<Contest> => {
  const response = await axiosInstance.get(`/api/v1/contest/${contestId}`);
  return response.data.contest;
};

export const createContest = async (data: CreateContestData): Promise<any> => {
  const response = await axiosInstance.post("/api/v1/contest/create", data);
  return response.data;
};

export const updateContest = async (
  contestId: string,
  data: UpdateContestData
): Promise<any> => {
  const response = await axiosInstance.patch(
    `/api/v1/contest/${contestId}`,
    data
  );
  return response.data;
};

export const deleteContest = async (contestId: string): Promise<any> => {
  const response = await axiosInstance.delete(`/api/v1/contest/${contestId}`);
  return response.data;
};

// Challenge APIs
export const fetchChallenges = async (contestId: string): Promise<Challenge[]> => {
  const response = await axiosInstance.get(
    `/api/v1/contest/${contestId}/challenges`
  );
  return response.data.challenges;
};

export const fetchChallenge = async (
  contestId: string,
  challengeId: string
): Promise<Challenge> => {
  const response = await axiosInstance.get(
    `/api/v1/contest/${contestId}/challenge/${challengeId}`
  );
  return response.data.challenge;
};

export const createChallenge = async (
  contestId: string,
  data: CreateChallengeData
): Promise<any> => {
  const response = await axiosInstance.post(
    `/api/v1/contest/${contestId}/challenge`,
    data
  );
  return response.data;
};

export const updateChallenge = async (
  contestId: string,
  challengeId: string,
  data: UpdateChallengeData
): Promise<any> => {
  const response = await axiosInstance.patch(
    `/api/v1/contest/${contestId}/challenge/${challengeId}`,
    data
  );
  return response.data;
};

export const deleteChallenge = async (
  contestId: string,
  challengeId: string
): Promise<any> => {
  const response = await axiosInstance.delete(
    `/api/v1/contest/${contestId}/challenge/${challengeId}`
  );
  return response.data;
};

// My Contests API
export const fetchMyContests = async (params?: {
  status?: string;
  search?: string;
  sort?: string;
}): Promise<Contest[]> => {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.set("status", params.status);
  if (params?.search) queryParams.set("search", params.search);
  if (params?.sort) queryParams.set("sort", params.sort);
  const query = queryParams.toString();
  const response = await axiosInstance.get(
    `/api/v1/my-contests${query ? `?${query}` : ""}`
  );
  return response.data.contests;
};

// Contest Stats API
export const fetchContestStats = async (
  contestId: string
): Promise<ContestStats> => {
  const response = await axiosInstance.get(
    `/api/v1/contest/${contestId}/stats`
  );
  return response.data;
};

// ==================== DASHBOARD APIs ====================

export interface UserStats {
  username: string;
  rating: number;
  rank: number;
  problemsSolved: number;
  totalProblems: number;
  totalSubmissions: number;
  acceptedSubmissions: number;
  acceptanceRate: number;
  streak: number;
  contestsPlayed: number;
}

export interface UserSubmission {
  id: string;
  problemTitle: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  contestTitle: string;
  contestSlug: string;
  status: string;
  score: number | null;
  submittedAt: string;
}

export interface RatingHistory {
  day: string;
  rating: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  rating: number;
}

export interface UpcomingContest {
  id: string;
  title: string;
  slug: string;
  startTime: string;
  challenges: number;
  participants: number;
}

// User Stats API
export const fetchUserStats = async (userId: string): Promise<UserStats> => {
  const response = await axiosInstance.get(`/api/v1/user/${userId}/stats`);
  return response.data;
};

// User Submissions API
export const fetchUserSubmissions = async (
  userId: string,
  limit?: number
): Promise<UserSubmission[]> => {
  const query = limit ? `?limit=${limit}` : "";
  const response = await axiosInstance.get(
    `/api/v1/user/${userId}/submissions${query}`
  );
  return response.data.submissions;
};

// User Rating History API
export const fetchUserRatingHistory = async (
  userId: string
): Promise<RatingHistory[]> => {
  const response = await axiosInstance.get(
    `/api/v1/user/${userId}/rating-history`
  );
  return response.data.ratingHistory;
};

// Leaderboard API
export const fetchLeaderboard = async (
  limit?: number
): Promise<LeaderboardEntry[]> => {
  const query = limit ? `?limit=${limit}` : "";
  const response = await axiosInstance.get(`/api/v1/leaderboard${query}`);
  return response.data.leaderboard;
};

// Upcoming Contests API
export const fetchUpcomingContests = async (
  limit?: number
): Promise<UpcomingContest[]> => {
  const query = limit ? `?limit=${limit}` : "";
  const response = await axiosInstance.get(
    `/api/v1/contests/upcoming${query}`
  );
  return response.data.contests;
};
