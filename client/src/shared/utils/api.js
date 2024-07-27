import axios from 'axios';
import toast from '../../shared/utils/toast';
import { objectToQueryString } from '../../shared/utils/url';
import {
  getStoredAuthToken,
  removeStoredAuthToken,
  storeAuthToken,
  storeRefreshToken,
} from '../../shared/utils/authToken';

const defaults = {
  baseURL: process.env.REACT_APP_API_URL || 'https://bluetape-real.onrender.com/v1',
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: getStoredAuthToken()
      ? `Bearer ${getStoredAuthToken()}`
      : undefined,
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message:
      'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      (response) => {
        if (response.data.tokens) {
          storeAuthToken(response.data.tokens.access.token);
          storeRefreshToken(response.data.tokens.refresh.token);
        }
        resolve(response.data);
      },
      (error) => {
        if (error.response) {
          if (error.response.data.statusText === 'INVALID_TOKEN') {
            removeStoredAuthToken();
          } else {
            reject(error.response.data);
          }
        } else {
          reject(defaults.error);
        }
      }
    );
  });

const optimisticUpdate = async (url, updatedFields) => {
  try {
    await api('put', url, updatedFields);
  } catch (error) {
    toast.error(error);
  }
};

const exported = {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  patch: (...args) => api('patch', ...args),
  delete: (...args) => api('delete', ...args),
  optimisticUpdate,
};

export default exported;