import axios from 'axios';
import baseAxios from '@/utils/common/axios';

const profileService = baseAxios(
  `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/user/v1`
);

export const getProfile = async (params: {
  userId: number;
  accessToken: string;
}): Promise<any> => {
  const { userId, accessToken } = params;
  try {
    const response = await profileService.get(`/profiles`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response) {
      console.log('userId not found:', response);
    }
    return response.data;
  } catch (error) {
    console.log(`Error Get Profile Data :${error}`);
  }
};

export const updateProfile = async (params: {
  full_name?: string;
  gender?: string;
  address?: string;
  phone_number?: string;
  accessToken?: string;
  avatar?: FormData;
}): Promise<any> => {
  try {
    console.log('Updating profile with params:', params); // Debug log
    // If we're uploading an avatar, don't set Content-Type (browser will set it with boundary)
    const response = await profileService.patch(
      `/profiles/`,
      {
        ...params,
        avatar: params.address
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${params.accessToken}`
        }
      }
    );

    console.log('Profile update response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
    throw error;
  }
};
