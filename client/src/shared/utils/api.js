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
    console.log(`Requesting URL: ${config.baseURL}${config.url}`); // Log the full URL
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to log the response status and errors
api.interceptors.response.use(
  (response) => {
    console.log(`Response Status: ${response.status} for URL: ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.log(`Error Status: ${error.response.status} for URL: ${error.response.config.url}`);
      console.log(`Error Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.log(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// Export the Axios instance
export default api;
