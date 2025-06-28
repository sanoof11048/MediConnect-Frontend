import axios from "axios";

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://medi-connect-api-zak6.onrender.com/api",
  withCredentials: true,
});

axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axiosAuth;
