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
    }
  });

  // Interceptor untuk menambahkan token dari NextAuth
  axiosCreate.interceptors.request.use(
    async (config) => {
      const session = await getSession();

      if (session?.user.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
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
