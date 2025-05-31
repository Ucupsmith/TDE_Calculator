import axios from 'axios';

const profileService = axios.create({
  baseURL: 'http://localhost:8000/user/v1'
});

export const updateProfile = async (params: {
  full_name?: string;
  gender?: string;
  address?: string;
}): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    console.log('Updating profile with params:', params); // Debug log

    const response = await profileService.patch(
      '/profiles/',
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
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
