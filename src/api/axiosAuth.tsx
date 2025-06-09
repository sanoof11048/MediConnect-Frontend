import axios from "axios";

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:7267/api",
  withCredentials: true,
});

export default axiosAuth;
