import baseAxios from '@/utils/common/axios';

const mealHistoryService = baseAxios(
  `${process.env.NEXT_PUBLIC_API_URL ?? `http://localhost:8000`}/user/v1/meal-plans`
);
// Types
export interface MealHistoryFood {
  // Based on the formatted output in MealHistoryModel.js
  id: number | null; // food ID can be null for custom food
  name: string;
  calories: number;
  unit: string;
  imageUrl: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  quantity: number;
}

export interface MealHistory {
  // Based on the formatted output in MealHistoryModel.js
  id: number;
  date: string;
  totalCalories: number;
  foods: MealHistoryFood[];
  caption?: string;
  goal: string;
  tdeeResult: number;
  calorieRemaining: number;
}

interface ApiError {
  message: string;
  data?: any;
}

// Get meal history
export const getMealHistory = async (params: {
  userId: number;
  accessToken?: string;
}): Promise<any> => {
  const { userId, accessToken } = params;
  console.log('Debug - userId in getMealHistory (before request):', userId);
  try {
    if (accessToken === null || accessToken === '') {
      console.log('accessToken invalid');
    }
    const requestUrl = `/history?userId=${userId}`;
    console.log('Debug - Request URL:', requestUrl);
    const response = await mealHistoryService.get(requestUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(`Error Cannot Get Meal History:${error}`);
  }
};

export const DeleteSelectionMeal = async (params: {
  foodEntryId: number;
}): Promise<any> => {
  const { foodEntryId } = params;
  try {
    const response = await mealHistoryService.delete(
      `/history/food/${foodEntryId}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    if (!response) {
      console.log(`error retrieving data axios meal history:`);
    }
    return response.data;
  } catch (error) {
    console.log(`Error Delete Selection Meal Food ${error}`);
  }
};

export const DeleteMealHistory = async (params: {
  date: string;
  userId: number;
}): Promise<any> => {
  const { date, userId } = params;
  try {
    const response = await mealHistoryService.delete(
      `/history/day/${date}?userId=${userId}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    if (!response) {
      console.log(`error retrieving data axios meal history:`);
    }
    return response.data;
  } catch (error) {
    console.log(`Error Delete Selection Meal Food ${error}`);
  }
};

export const EditSelectedFood = async (params: {
  foodEntryId: number;
  quantity: number;
}): Promise<any> => {
  const { foodEntryId, quantity } = params;
  try {
    const response = await mealHistoryService.put(
      `/history/food/${foodEntryId}`,
      {
        quantity
      },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error Edit Data Selected Foods Meal History:${error}`);
  }
};
