import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const parseApiError = (error) => {
  const data = error.response?.data;

  if (typeof data === 'string' && data.includes('MethodNotAllowed')) {
    return 'Unable to reach the API. Please ensure the dev server is running and try again.';
  }

  if (data?.data?.message) return data.data.message;
  if (data?.error) return data.error;
  if (data?.message) return data.message;

  if (error.response?.status === 405) {
    return 'API request not allowed. Please restart the dev server (npm run dev).';
  }

  return error.message || 'Something went wrong';
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(parseApiError(error)))
);

export default axiosInstance;
