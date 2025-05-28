import { error } from 'console';
import baseAxios from '../utils/common/axios';
import Email from 'next-auth/providers/email';

const authService = baseAxios(
  `${process.env.NEXT_PUBLIC_API_URL ?? `http://localhost:8000`}/user/v1`
);

export const loginUser = async (params: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken === undefined || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    const response = await authService.post(
      '/users/login',
      { ...params },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response;
  } catch (error) {
    console.log(`Error user login : ${error}`);
  }
};

export const registerUser = async (params: {
  username: string;
  number_phone: string;
  password: string;
  email: string;
}): Promise<any> => {
  try {
    const response = await authService.post(
      '/users/register',
      {
        ...params
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error('No data received from server!');
    }
  } catch (error) {
    console.log(`error fetching data : ${error}`);
  }
};
