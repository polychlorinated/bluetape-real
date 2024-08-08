import axios from 'axios';
import { getStoredAuthToken, getStoredRefreshToken, setStoredAuthToken, isTokenExpired, removeStoredAuthToken, removeStoredRefreshToken } from './authToken';

const baseURL = process.env.REACT_APP_API_URL || 'https://bluetape-real.onrender.com/v1/';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    let token = getStoredAuthToken();
    if (token && isTokenExpired(token)) {
      console.log('Token expired, attempting to refresh');
      try {
        const refreshToken = getStoredRefreshToken();
        const response = await axios.post(`${baseURL}/auth/refresh-tokens`, { refreshToken });
        setStoredAuthToken(response.data.tokens.access.token);
        token = response.data.tokens.access.token;
      } catch (error) {
        console.error('Token refresh failed:', error);
        removeStoredAuthToken();
        removeStoredRefreshToken();
        // Redirect to signIn or handle refresh failure
        window.location.href = '/signIn';
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`Requesting URL: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export default api;