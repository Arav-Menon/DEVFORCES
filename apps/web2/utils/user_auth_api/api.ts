import axios from "axios";
import { API_URL } from "../api_url";

const axiosInstence = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface SigninUser {
  email: string;
  password: string;
}

export const signin = async (email: string, password: string) => {
  const response = await axiosInstence.post("/api/v1/user/auth", {
    email,
    password,
  });
  return response.data.token;
};

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await axiosInstence.post("/api/v1/user/auth", {
    username,
    email,
    password,
  });
  return response.data.token;
};
