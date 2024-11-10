import axios, { AxiosError } from "axios";
import { ApiError } from "@/types/api";

export const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "/api" // Uses proxy in dev
    : import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: "An unexpected error occurred",
      status: error.response?.status || 500,
    };

    if (error.response?.data && typeof error.response.data === "object") {
      apiError.message =
        (error.response.data as any).message || apiError.message;
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(apiError);
  }
);
