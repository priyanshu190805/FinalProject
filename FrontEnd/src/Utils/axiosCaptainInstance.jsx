import axios from "axios";

const axiosCaptainInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosCaptainInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosCaptainInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/captains/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.accessToken;

        localStorage.setItem("token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosCaptainInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error); // if not retrying, just throw error
  }
);

export default axiosCaptainInstance;
