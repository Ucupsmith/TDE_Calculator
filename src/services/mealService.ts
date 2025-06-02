import axios, { AxiosError } from 'axios';
import { Meal } from '@/data/mealHistoryData';

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
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface MealHistoryParams {
  userId: string;
  tdeeId: string;
  startDate?: string;
  endDate?: string;
}

interface UpdateMealData {
  userId: string;
  foodId: number;
  portion: number;
  mealType: string;
  date: string;
}

interface ApiError {
  message: string;
  data?: any;
}

interface MealHistoryResponse {
  history: {
    id: number;
    date: string;
    calories: number;
    foods: {
      id: number;
      name: string;
      weight: number;
      image: string;
      calories: number;
      mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    }[];
    caption: string;
    goal: number;
    tdee: number;
  }[];
}

interface UpdateMealRequest {
  userId: string;
  foodId: number;
  portion: number;
  mealType: string;
  date: string;
}

interface UserMealSelection {
  id: number;
  userId: string;
  tdeeId: string;
  date: string;
  foods: {
    id: number;
    name: string;
    weight: number;
    image: string;
    calories: number;
    mealType: string;
  }[];
  totalCalories: number;
  goal: number;
  tdee: number;
  caption?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const mealService = {
  // Get meal history
  getMealHistory: async ({ userId, tdeeId, startDate, endDate }: MealHistoryParams) => {
    try {
      const params: Record<string, string> = { userId, tdeeId };
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      const response = await api.get('/history', { params });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw axiosError.response?.data || axiosError.message;
    }
  },

  // Update meal
  updateMeal: async (id: number, data: UpdateMealData) => {
    try {
      const response = await api.put(`/history/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw axiosError.response?.data || axiosError.message;
    }
  },

  // Delete meal
  deleteMeal: async (id: number, userId: string) => {
    try {
      const response = await api.delete(`/history/${id}`, {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw axiosError.response?.data || axiosError.message;
    }
  }
}; 