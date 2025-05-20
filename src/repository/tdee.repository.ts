import baseAxios from '@/utils/common/axios';

const tdeeService = baseAxios(
  `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/user/v1/tdee`
);

const getTdeeCalcualation = async (id: string): Promise<any> => {
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
