import axios from 'axios';
import { backend_url } from "../server";

// Set up axios to point to the backend API
const API = axios.create({
  baseURL: `${backend_url}`,
});

// Add a request interceptor to add JWT token in headers for protected routes
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
