import baseAxios from '@/utils/common/axios';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';
import { error } from 'console';

const mealService = baseAxios(
  `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/user/v1`
);

interface MainFoodInput {
  name: string;
  calories: number;
  unit: string | number;
  isCustom?: boolean;
}

export const getMealCalculateMeals = async (params: {
  tdeeId: number;
  userId: number;
  accessToken: string;
}): Promise<any> => {
  const { accessToken, userId, tdeeId } = params;
  try {
    const response = await mealService.get(
      `/meal-plans/current-day?userId=${userId}&tdeeId=${tdeeId}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    if (!response) {
      console.log('mealplan null:', response);
    } else {
      console.log(response.data);
    }
    console.log('error get MealPlan:', response);
    return response.data;
  } catch (error) {
    console.log(`error fetching data mealplans :${error}`);
  }
};

export const addMealCustom = async (params: {
  name: string;
  calories: number;
  quantity: number;
}): Promise<any> => {
  const { name, calories, quantity } = params;
  try {
    if (name && calories && quantity) {
      console.log('Succecced add custom food!');
    }
    const response = await mealService.post(
      '/foods/custom',
      { ...params, name, calories, quantity: quantity | 1 },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    return await response.data;
  } catch (error) {
    console.log(`Cannot Post Meal Custom :${error}`);
  }
};

export const addMainUserFoods = async (params: {
  userId: number;
  foods: MainFoodInput[];
  accessToken: string;
}): Promise<any> => {
  const { accessToken } = params;
  try {
    const response = await mealService.post(
      `/meal-plans/history`,
      {
        ...params,
        userId: params.userId,
        foods: params.foods
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    if (response) {
      return response.data;
    } else {
      console.log(`Error Catch User Meal Selection :${response}`);
    }
  } catch (error) {
    console.log(`Cannot Post User Meal Selection :${error}`);
  }
};
export const getCustomUserFood = async (params: {
  userId: number;
  accessToken: string;
}): Promise<any> => {
  const { userId, accessToken } = params;
  try {
    const response = await mealService.get(
      `/foods/custom/user?userId=${userId}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    if (!response) {
      console.log('UserId Not Found!', response);
    }
    return response.data;
  } catch (error) {
    console.log(`Cannot Get Meal Custom: ${error}`);
  }
};

export const getMainUserFoods = async (params: {
  name: string;
}): Promise<any> => {
  const { name } = params;
  try {
    const response = await mealService.get(`/foods/`, {
      params: {
        name
      },
      headers: {
        Accept: 'application/json'
      }
    });
    console.log("Raw response data from getMainUserFoods:", response.data);
    if (response.status === null) {
      return await Promise.resolve('data null');
    }
    return response.data;
  } catch (error) {
    console.log(`Cannot Get All Main Foods :${error}`);
  }
};
