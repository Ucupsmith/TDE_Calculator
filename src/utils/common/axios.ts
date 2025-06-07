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

  axiosCreate.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        const errorCode = error.response?.data?.error?.toUpperCase() || '';
        const msg = error.response?.data?.message?.toLowerCase() || '';

        const isSessionExpired =
          errorCode === 'TOKEN_EXPIRED' ||
          msg.includes('expired') ||
          msg.includes('invalid token');

        if (isSessionExpired) {
          window.dispatchEvent(new Event('sessionExpired'));
        }
      }
      return Promise.reject(error);
    }
  );

  // axiosCreate.interceptors.response.use(
  //   (response) => {
  //     return response.data;
  //   },
  //   async (error) => {
  //     if (error.response.status === 401) {
  //       clearLocalStorage();
  //       // clear all auth cookie or auth local storage
  //     }
  //     return await Promise.reject(error);
  //   }
  // );

  return axiosCreate;
};

export default axiosInterceptor;
