import baseAxios from '@/utils/common/axios';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';
import { getSession } from 'next-auth/react';

const tdeeService = baseAxios(
  `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/user/v1`
);

export const getTdeeCalcualation = async (id: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = tdeeService.get(`/history/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return await response;
  } catch (error) {
    console.log('error get tdee calculation', error);
  }
};

export const tdeeCalculation = async (params: {
  tdeeId?: number;
  gender: 'Male' | 'Female';
  weight: number;
  height: number;
  age: number;
  activity_level: string | any;
  region?: 'asia';
  goal: 'LoseWeight' | 'MaintainWeight' | 'GainWeight';
}): Promise<any> => {
  try {
    const session = await getSession();
    const accessToken = session?.user.accessToken;
    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('calculation accessToken not found');
    }
    const { age, weight, height } = params;
    if (age === null && weight === null && height === null) {
      console.log('input invalid');
    }
    const response = await tdeeService.post(
      '/tdee/calculate',
      {
        ...params,
        goal: params.goal || 'MainTainWeight',
        region: params.region || 'asia'
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return await response.data;
  } catch (error) {
    console.log(`error fetching data : ${error}`);
  }
};

export const saveTdeeCalculation = async (params: {
  userId: number;
  gender: string;
  weight: number;
  height: number;
  age: number;
  activity_level: string;
  goal: string;
  tdee_result: number;
  saved_id?: number;
}): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    if (!params.userId) {
      throw new Error('profileId is required and must be valid');
    }
    const response = tdeeService.post(
      `/tdee/save`,
      {
        ...params
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return await response;
  } catch (error) {
    console.log(`error fetching data : ${error}`);
  }
};

export const saveTdeeCalculationToHome = async (params: {
  userId: number;
  tdee_result: number;
  accessToken: string;
  goal?: string;
}): Promise<any> => {
  try {
    const response = await tdeeService.post(
      `/tdee/home/save`,
      { ...params },
      {
        headers: {
          Accept: `application/json`,
          Authorization: `Bearer ${params.accessToken ?? ''}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(`error fetching data : ${error}`);
  }
};

export const getTdeeCalculationHome = async (params: {
  tdeeId?: number;
  userId: number;
  accessToken: string;
}): Promise<any> => {
  const { userId, accessToken } = params;
  try {
    const response = await tdeeService.get(
      `/tdee/home/history?userId=${userId}`,
      {
        headers: {
          Accept: `application/json`,
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return await response.data;
  } catch (error) {
    console.log('Error fetching TDEE calculation:', error);
    return null;
  }
};

export const deleteSaveTdee = async (params: {
  tdeeId: number;
  userId: number;
  accessToken?: string;
}): Promise<any> => {
  const { tdeeId, userId, accessToken } = params;
  try {
    if (isUndefindOrNull(accessToken) && isEmptyString(accessToken)) {
      return await Promise.resolve(null);
    }
    if (accessToken === null && accessToken === '') {
      return await Promise.resolve('accessToken not found!');
    }
    const response = await tdeeService.delete(`/tdee/history/${tdeeId}`);
    return (await response).data;
  } catch (error) {
    console.log('Error fetching TDEE calculation:', error);
    throw error;
  }
};
