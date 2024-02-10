import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
