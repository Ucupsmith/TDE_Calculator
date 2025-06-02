import baseAxios from '@/utils/common/axios';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';
import { error } from 'console';

const mealService = baseAxios(
  `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/user/v1`
);

export const getMealPlans = async (params: {
  accessToken?: string;
  userId: number;
}): Promise<any> => {
  const { accessToken, userId } = params;
  try {
    if (accessToken === null && accessToken === '') {
      return await Promise.resolve('accessToken not found!');
    }
    const response = await mealService.get(
      `/meal-plans/summary?userId=${userId}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error fetching data mealplans :${error}`);
  }
};

export const getFoodsUser = async (): Promise<any> => {
  try {
    const response = await mealService.get('/Foods/', {
      headers: {
        Accept: 'application/json'
      }
    });
    if (response.status === null) {
      return await Promise.resolve('data null');
    }
    return response.data;
  } catch (error) {}
};
