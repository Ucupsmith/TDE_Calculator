import { getLocalStorage } from '@/utils/common/localStorage';
import type { AxiosInstance } from 'axios';
import axios, { AxiosHeaders } from 'axios';

const axiosInterceptor = (
  url: string | undefined,
  isAuthenticated: boolean = false,
  additionalHeaders = {}
): AxiosInstance => {
  const customUrl = (url = process.env.NEXT_PUBLIC_API_URL);
  const customHeader = AxiosHeaders.from(additionalHeaders);

  const axiosCreate = axios.create({
    baseURL: customUrl,
    headers: {
      Platform: 'web',
      Accept: 'application/json',
      'Accept-Language': 'es',
      'Content-Type': 'application/json',
      ...(isAuthenticated
        ? { Authorization: `Bearer ${getLocalStorage('accessToken', '')}` }
        : null),
      ...customHeader
    }
  });

  axiosCreate.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      if (error.response.status === 401) {
        // clear all auth cookie or auth local storage
      }
      return await Promise.reject(error);
    }
  );

  return axiosCreate;
};

export default axiosInterceptor;
