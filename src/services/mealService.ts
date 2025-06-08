import { getTdeeCalcualation } from '@/repository/tdee.repository';
import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8000/user/v1/meal-selections';

// Konfigurasi axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor untuk menambahkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Optional: handle cases where token is missing
      // For now, just proceed without token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Types
export interface MealHistoryFood {
  id: number;
  name: string;
  calories: number;
  unit: string;
  imageUrl: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface MealHistory {
  id: number;
  date: string;
  calories: number; // Total calories for the day
  foods: MealHistoryFood[];
  caption?: string; // Make caption optional
  goal: number;
  tdee: number; // TDEE target or calculation base
  tdeeResult: number; // Actual calculated TDEE result for the day
  calorieRemaining: number;
}

interface ApiError {
  message: string;
  data?: any;
}

// Get meal history
export const getMealHistory = () => {};

// Save meal plan to history (sends aggregated daily data to backend)
export const saveMealPlanToHistory = async (
  mealPlan: Omit<MealHistory, 'id'>
): Promise<MealHistory> => {
  try {
    // TODO: Implement actual API call when backend is ready
    // This API call should send the aggregated daily meal data
    // const response = await api.post<MealHistory>('/history', mealPlan);
    // return response.data;

    // TEMPORARY: Dummy implementation
    const dummySavedMeal: MealHistory = { ...mealPlan, id: Math.random() }; // Assign a temporary ID
    console.log('Simulating saveMealPlanToHistory', dummySavedMeal);
    // In a real scenario, you'd typically update frontend state or refetch history here
    return Promise.resolve(dummySavedMeal); // Simulate async call
    // END OF TEMPORARY DUMMY
  } catch (error) {
    console.error('Error saving meal plan to history:', error);
    const axiosError = error as AxiosError<ApiError>;
    throw (
      axiosError.response?.data ||
      axiosError.message ||
      'Failed to save meal plan'
    );
  }
};

// Delete meal (deletes a specific daily entry)
export const deleteMeal = async (mealId: number): Promise<void> => {
  try {
    // TODO: Implement actual API call when backend is ready
    // This API call should delete the specific daily history entry by ID
    // await api.delete(`/history/${mealId}`);

    // TEMPORARY: Dummy implementation
    console.log(`Simulating deleteMeal for ID: ${mealId}`);
    return Promise.resolve(); // Simulate async call
    // END OF TEMPORARY DUMMY
  } catch (error) {
    console.error('Error deleting meal:', error);
    const axiosError = error as AxiosError<ApiError>;
    throw (
      axiosError.response?.data || axiosError.message || 'Failed to delete meal'
    );
  }
};

// Update meal (updates a specific daily entry)
export const updateMeal = async (
  mealId: number,
  mealData: Partial<MealHistory>
): Promise<MealHistory> => {
  try {
    // TODO: Implement actual API call when backend is ready
    // This API call should update the specific daily history entry by ID
    // const response = await api.put<MealHistory>(`/history/${mealId}`, mealData);
    // return response.data;

    // TEMPORARY: Dummy implementation
    const dummyUpdatedMeal: MealHistory = {
      id: mealId,
      ...mealData
    } as MealHistory; // Simulate finding and updating
    console.log(`Simulating updateMeal for ID: ${mealId}`, dummyUpdatedMeal);
    return Promise.resolve(dummyUpdatedMeal); // Simulate async call
    // END OF TEMPORARY DUMMY
  } catch (error) {
    console.error('Error updating meal:', error);
    const axiosError = error as AxiosError<ApiError>;
    throw (
      axiosError.response?.data || axiosError.message || 'Failed to update meal'
    );
  }
};
