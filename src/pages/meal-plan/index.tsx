import MealPlanSection2 from '@/components/meal-plan/MealPlanSection2';
import MealPlanSection3 from '@/components/meal-plan/MealPlanSection3';
import { getMealPlans } from '@/repository/mealplan.repository';
import { Progress, Typography } from '@material-tailwind/react';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

interface MealResponse {
  goal: string;
  tdee: string;
}

interface MealPayload {
  accessToken?: string;
  userId: number;
}

const MealPlanPage = () => {
  const [mealFoods, setMealFoods] = useState<[]>([]);
  const [mealRemaining, setMealRemaining] = useState<MealResponse | null>(null);

  const label = 'remaining';
  const barProps = {
    100: ''
  };

  const fetchDataFoods = async (): Promise<void> => {
    const session = await getSession();
    const accessToken = session?.user.accessToken;
    const userId = session?.user.userId as number;
    try {
      const payload: MealPayload = {
        userId: userId,
        accessToken: accessToken
      };
      const response = await getMealPlans(payload);
      if (response !== null || response !== undefined) {
        setMealRemaining(response);
      }
      {
        console.log(response.data);
      }
      if (response) {
        console.log('Berhasil menyimpan TDEE ke home');
      } else {
        console.warn('Gagal menyimpan:', response);
      }
      return response;
    } catch (error) {
      console.log(`error fetching data:${error}`);
    }
  };
  useEffect(() => {
    void fetchDataFoods();
  }, []);

  return (
    <div className='w-full py-3 flex flex-col  items-center justify-center gap-10'>
      <Typography className='font-poppins font-semibold text-green-500 text-3xl md:text-xl capitalize'>
        meal plan
      </Typography>
      <span className='border-2 border-t-green-500 w-full'></span>
      <div className='md:w-full flex flex-col gap-10 justify-between items-start py-3 px-2'>
        <div className='md:w-full justify-center flex flex-row gap-2 items-end'>
          <Typography className='font-poppins font-normal text-green-500 text-xl md:text-xl capitalize'>
            calories per day
          </Typography>
          <Typography className='font-extralight font-poppins text-xs md:text-sm text-green-600 capitalize'>
            {`${mealRemaining?.goal} weight`}
          </Typography>
        </div>
        <div className='flex flex-row w-full'>
          <Progress
            size='lg'
            className=''
            label={label}
            barProps={{
              100: 'text-red-500'
            }}
            value={Number(mealRemaining?.tdee)}
          />
        </div>
        <div className='md:w-full justify-center flex flex-row gap-2'>
          <div className='w-1/2  flex flex-row items-center justify-end gap-2'>
            <Typography className='font-poppins font-normal text-green-500 text-lg md:text-xl capitalize'>
              0
            </Typography>
            <Typography className='font-poppins font-normal text-green-500 text-lg md:text-xl capitalize'>
              /
            </Typography>
            <Typography className='font-extralight font-poppins text-lg md:text-xl text-green-600 capitalize'>
              {mealRemaining?.tdee}
            </Typography>
          </div>
          <div className='w-1/2 flex flex-row gap-1 justify-between  items-end'>
            {/* <Image src={} alt='' /> */}
            <Typography className='font-extralight font-poppins text-xs md:text-sm text-green-600 capitalize'>
              {Number(mealRemaining?.tdee) > Number(mealRemaining?.tdee)
                ? 'Over Calories! You might gain weight.'
                : 'Calories Remaining'}
            </Typography>
          </div>
        </div>
      </div>
      <div className='border-2 border-b-green-500 w-full'></div>
      <MealPlanSection2 />
      <MealPlanSection3 />
    </div>
  );
};

export default MealPlanPage;
