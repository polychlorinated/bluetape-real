import axios from 'axios';
import { getStoredAuthToken } from './authToken';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://bluetape-real.onrender.com/', // Ensure this is correct
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = getStoredAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;