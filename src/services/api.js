import axios from "axios";
import toast from "react-hot-toast";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-storage")
      ? JSON.parse(localStorage.getItem("auth-storage")).state.token
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }

    if (error.response?.status === 403) {
      toast.error("Access denied. Insufficient permissions.");
    }

    return Promise.reject(error);
  }
);

export default api;
