import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Intercepteur → ajoute automatiquement le token admin
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
