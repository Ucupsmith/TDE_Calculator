import {
  clearLocalStorage,
  getLocalStorage
} from '@/utils/common/localStorage';
import type { AxiosInstance } from 'axios';
import axios, { AxiosHeaders } from 'axios';
import { getSession, useSession } from 'next-auth/react';

const axiosInterceptor = (url: string): AxiosInstance => {
  const axiosCreate = axios.create({
    baseURL: url,
    headers: {
      Platform: 'web',
      Accept: 'application/json',
      'Accept-Language': 'id',
      'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 seconds timeout
  });

  // Request interceptor
  axiosCreate.interceptors.request.use(
    async (config) => {
      try {
        const session = await getSession();
        if (session?.user.accessToken) {
          config.headers.Authorization = `Bearer ${session.user.accessToken}`;
        }
        return config;
      } catch (error) {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosCreate.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        // Handle specific error status codes
        switch (error.response.status) {
          case 401:
            // Unauthorized - clear auth data and redirect to login
            clearLocalStorage();
            window.location.href = '/auth/login';
            break;
          case 403:
            // Forbidden
            console.error('Access forbidden');
            break;
          case 404:
            // Not found
            console.error('Resource not found');
            break;
          case 500:
            // Server error
            console.error('Server error:', error.response.data);
            break;
          default:
            console.error('API error:', error.response.data);
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
      } else {
        // Error in request configuration
        console.error('Request error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return axiosCreate;
};

export default axiosInterceptor;
