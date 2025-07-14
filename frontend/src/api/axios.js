import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/dev/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token :",token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
