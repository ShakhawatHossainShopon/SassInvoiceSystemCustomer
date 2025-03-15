// apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.BASE_URL, // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add token to headers (if available)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token if available
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
