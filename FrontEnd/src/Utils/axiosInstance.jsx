// src/utils/axiosInstance.js
import axios from "axios";

// Create a pre-configured axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // send cookies like refreshToken to backend
});

// Add Authorization token to every request if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get access token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired access token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only refresh if we get 403 or 401 and haven't tried already
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // mark it so we don’t retry infinitely

      try {
        // Hit refresh-token endpoint
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.accessToken;

        localStorage.setItem("token", newAccessToken); // save new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // update token in original request

        return axiosInstance(originalRequest); // retry the original request
      } catch (refreshError) {
        console.error("Refresh failed", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect to login
      }
    }

    return Promise.reject(error); // if not retrying, just throw error
  }
);

export default axiosInstance;
