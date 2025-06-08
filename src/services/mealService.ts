import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8000/user/v1'; // Base URL updated to include '/user/v1'

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

// Types (Ensure these match the backend response structure)
export interface MealHistoryFood {
  // Based on the formatted output in MealHistoryModel.js
  id: number | null; // food ID can be null for custom food
  name: string;
  calories: number;
  unit: string | null; // unit is null for custom food
  imageUrl: string | null; // imageUrl is null for custom food
  quantity: number; // Added quantity based on backend model
  isCustom: boolean; // Added isCustom flag
  // mealType is not included in the backend response currently, remove or handle on frontend if needed
}

export interface MealHistory {
  // Based on the formatted output in MealHistoryModel.js
  id: number;
  date: string; // Date can be kept as string or parsed to Date object on frontend
  totalCalories: number; // Renamed from 'calories' to match backend output field
  foods: MealHistoryFood[];
  // caption is not included in backend response, remove or handle on frontend if needed
  // goal is not included in backend response currently, remove or handle on frontend if needed
  // tdee is not included in backend response currently, remove or handle on frontend if needed
  tdeeResult: number;
  calorieRemaining: number;
}

interface ApiError {
  message: string;
  data?: any;
}

// Define a type for the food items expected in the update payload
export interface MealUpdateFoodPayload {
  id: number; // ID of the DailyMealFoodEntry
  quantity: number; // The updated quantity
  // Add other fields here if the backend expects them for update
  // e.g., isCustom: boolean; customName?: string; customCalories?: number;
}

// Define a type for the meal data expected in the update payload
export interface MealUpdatePayload {
  // Include only the fields that can be updated for a meal history entry
  foods: MealUpdateFoodPayload[];
  // Add other top-level fields here if they can be updated (e.g., caption, date - but date is read-only in UI)
}

// NOTE: The backend now aggregates data from DailyMealHistory and DailyMealFoodEntry.

// Get meal history - Now accepts userId as a parameter again, sent as a query parameter
export const getMealHistory = async (userId: number): Promise<MealHistory[]> => {
  try {
    const response = await api.get<MealHistory[]>(`/meal-plans/history?userId=${userId}`); // Send userId as query parameter
    return response.data;

  } catch (error) {
    console.error('Error fetching meal history:', error);
    // Handle API errors vs network errors
    const axiosError = error as AxiosError<ApiError>;
    throw axiosError.response?.data || axiosError.message || 'Failed to fetch meal history';
  }
};

// Save meal plan to history (sends aggregated daily data to backend)
export const saveMealPlanToHistory = async (mealPlan: Omit<MealHistory, 'id'>): Promise<MealHistory> => {
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
    throw axiosError.response?.data || axiosError.message || 'Failed to save meal plan';
  }
};

// Delete meal (deletes a specific daily entry)
export const deleteMeal = async (mealId: number): Promise<void> => {
  try {
    await api.delete(`/meal-plans/history/${mealId}`);

  } catch (error) {
    console.error('Error deleting meal:', error);
     const axiosError = error as AxiosError<ApiError>;
    throw axiosError.response?.data || axiosError.message || 'Failed to delete meal';
  }
};

// Update meal (updates a specific daily entry)
// Now accepts a payload with the updated foods list
export const updateMeal = async (mealId: number, mealData: MealUpdatePayload): Promise<MealHistory> => {
  try {
    // TODO: Implement actual API call when backend is ready
    // This API call should update the specific daily history entry by ID and its related food entries
    const response = await api.put<MealHistory>(`/meal-plans/history/${mealId}`, mealData);
    return response.data;

    // TEMPORARY: Dummy implementation - REMOVED
    // ... existing code ...

  } catch (error) {
    console.error('Error updating meal:', error);
     const axiosError = error as AxiosError<ApiError>;
    throw axiosError.response?.data || axiosError.message || 'Failed to update meal';
  }
}; 