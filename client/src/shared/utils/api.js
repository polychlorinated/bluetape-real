import axios from 'axios';
import { getStoredAuthToken } from './authToken';

// Use the environment variable set in Render, fallback to a default if not set
const baseURL = process.env.REACT_APP_API_URL || 'https://bluetape-real.onrender.com/v1/';

// Create an Axios instance
const api = axios.create({
  baseURL: baseURL,
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
    } else if (error.request) {
      console.log('Error: No response received', error.request);
    } else {
      console.log('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Export the Axios instance
export default api;