import { error } from 'console';
import baseAxios from '../utils/common/axios';

const authService = baseAxios(
  `${process.env.NEXT_PUBLIC_API_URL ?? `http://localhost:8000`}/user/v1/`
);

export const loginUser = async (params: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await authService.post(
      '/users/login',
      { ...params },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('An error occurred during login');
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
      { ...params },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    if (response.data) {
      return response.data;
    }
    throw new Error('No data received from server');
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('An error occurred during registration');
  }
};

// New function to request password reset
export const requestPasswordReset = async (email: string): Promise<any> => {
  try {
    const response = await authService.post(
      '/auth/request-password-reset',
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error requesting password reset:', error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('An error occurred while requesting password reset');
  }
};

// New function to reset password with token and new password
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<any> => {
  try {
    const response = await authService.post('/reset-password', {
      token: token,
      newPassword: newPassword
    });
    return response.data; // Assuming backend returns data on success
  } catch (error) {
    console.error('Error resetting password:', error);
  }
};
