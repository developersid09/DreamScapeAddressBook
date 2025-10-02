
import axios from "axios";
import { store } from "../store/index";

const API_BASE = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to add access token
api.interceptors.request.use((config) => {
  try {
    const state = store.getState();
    const token = state.auth.token;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore if store not ready
  }
  return config;
});

export default api;
