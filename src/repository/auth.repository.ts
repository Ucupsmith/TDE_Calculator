import Email from 'next-auth/providers/email';
import baseAxios from '@/utils/common/axios';

interface OAuthUserResponse {
  userId: number;
  accessToken: string;
  name: string;
  email: string;
  number_phone: string | null;
}

const authService = baseAxios(
  `${process.env.NEXT_PUBLIC_API_URL ?? `http://localhost:8000`}/user/v1`
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
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('An error occurred while requesting password reset');
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<any> => {
  try {
    const response = await authService.post('/auth/reset-password', {
      token: token,
      newPassword: newPassword
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('An error occurred while resetting password');
  }
};

export const oauthLoginRegister = async (params: {
  email: string;
  name: string;
  googleId: string;
}): Promise<OAuthUserResponse> => {
  try {
    const response = await authService.post(
      '/users/oauth-login-register', // This endpoint needs to exist on your backend
      {
        email: params.email,
        username: params.name, // Assuming backend uses 'username' for name
        googleId: params.googleId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    console.log('OAuth backend response:', response.data);
    return {
      userId: response.data.data.id,
      accessToken: response.data.token,
      name: response.data.data.username,
      email: response.data.data.email,
      number_phone: response.data.data.number_phone || null,
    };
  } catch (error: any) {
    console.error('OAuth login/register error detailed:', JSON.stringify(error.response?.data || error.message || error, null, 2));
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('An error occurred during OAuth login/registration');
  }
};