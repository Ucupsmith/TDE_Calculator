import baseAxios from '@/utils/common/axios';

const tdeeService = baseAxios(
  `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/user/v1`
);

export const getTdeeCalcualation = async (id: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = tdeeService.get(`/history/${id}`, {
      headers: {
        Accept: 'application/json'
      }
    });
    return await response;
  } catch (error) {
    console.log('error get tdee calculation', error);
  }
};

export const tdeeCalculation = async (params: {
  gender: 'male' | 'female';
  weight: number | null;
  height: number | null;
  age: number | null;
  activity_level: string | any;
  region?: string;
  goal?: string;
}): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { age, weight, height } = params;
    if (age === null && weight === null && height === null) {
      console.log('input invalid');
    }
    const response = await tdeeService.post(
      '/tdee/calculate',
      {
        ...params,
        goal: params.goal || 'maintain',
        region: params.region || 'asia'
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return response;
  } catch (error) {
    console.log(`error fetching data : ${error}`);
  }
};
