import axios from 'axios';

const profileService = axios.create({
  baseURL: 'http://localhost:8000/user/v1'
});

export const updateProfile = async (params: {
  full_name?: string;
  gender?: string;
  address?: string;
  accessToken?: string;
}): Promise<any> => {
  try {
    console.log('Updating profile with params:', params); // Debug log

    const response = await profileService.patch(
      '/profiles/',
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${params.accessToken}`
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

