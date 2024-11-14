import axios from 'axios';

// Set up axios to point to the backend API
const API = axios.create({
  baseURL: 'http://localhost:3000/api',
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
