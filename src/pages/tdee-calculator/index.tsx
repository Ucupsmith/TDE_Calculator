import TdeeCalculationComponent from '@/components/tdee-calculation/TdeeCalculationComponent';
import { Goal } from '@/generated/prisma';
import { TdeeFormType, useTdeeForm } from '@/hooks/useTdeeCalculation';
import {
  saveTdeeCalculation,
  saveTdeeCalculationToHome,
  tdeeCalculation
} from '@/repository/tdee.repository';
import {
  Accordion,
  button,
  Button,
  Input,
  Typography
} from '@material-tailwind/react';
import { getSession, useSession } from 'next-auth/react';
import React, { ReactNode, useEffect, useState } from 'react';

interface TdeeCalculateInterface {
  bmi: number;
  bmiCategory: string;
  bmr?: string;
  tdee: number;
  goal: string;
}

export interface SaveTdeeCalculationInterface {
  userId: number;
  tdee_result: number;
  accessToken: string;
}

const ActivityLevel = [
  'Sedentary',
  'Lightly Active',
  'Moderately Active',
  'Very Active',
  'Extra Active'
];

const TdeeCalculatorPage = () => {
  const { data: session } = useSession();
  const userId = session?.user.userId as number;
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useTdeeForm();
  const gender = watch('gender');
  const goal = watch('goal');
  const formWatch = watch();
  const [calculateTdee, setCalculateTdee] =
    useState<TdeeCalculateInterface | null>(null);
  const fetchDataTdee = async (data: TdeeFormType): Promise<void> => {
    setIsLoading(!isLoading);
    try {
      const payloadTdee = await tdeeCalculation({
        gender: data.gender,
        age: data.age,
        weight: data.weight,
        height: data.height,
        goal: data.goal,
        activity_level: data.activity_level
      });
      if (payloadTdee !== null && payloadTdee !== 0) {
        setCalculateTdee(payloadTdee.data);
        setIsModalOpen(payloadTdee.data);
      } else {
        setCalculateTdee(null);
      }
      console.log('calculateTdee', calculateTdee);
      if (!payloadTdee || typeof payloadTdee !== 'object') {
        console.warn('TDEE payloadTdee invalid or empty:', payloadTdee);
        setCalculateTdee(null);
        return;
      }
    } catch (error) {
      console.error('Error fetching TDEE:', error);
    } finally {
      setIsLoading(false);
    }
    reset({
      goal: 'MaintainWeight',
      gender: 'Male',
      activity_level: 'Sedentary'
    });
  };
  const handleSaveTdee = async () => {
    if (!calculateTdee) {
      return;
    }
    const session = await getSession();
    const accessToken = session?.user.accessToken as string;
    const userId = session?.user.userId as number;
    console.log(accessToken);
    try {
      const payload: SaveTdeeCalculationInterface = {
        userId: userId,
        tdee_result: calculateTdee.tdee,
        accessToken: accessToken
      };
      const response = await saveTdeeCalculationToHome(payload);
      if (response) {
        console.log('Berhasil menyimpan TDEE ke home.');
      } else {
        console.warn('Gagal menyimpan:', response);
      }
      console.log('accessToken:', session?.user.accessToken);
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error saat menyimpan:', error);
    }
  };
  useEffect(() => {
    void fetchDataTdee;
    void saveTdeeCalculationToHome;
  }, []);
  const handleButtonClick = (): void => {
    setButtonClicked(!buttonClicked);
  };
  return (
    <div className='w-full md:items-center flex flex-col justify-evenly gap-3 md:space-y-10'>
      <Typography className='text-center flex items-center justify-center md:hidden text-[#34D399] font-poppins font-semibold text-lg md:text-4xl capitalize h-20'>
        tdee calculator
      </Typography>
      <div className='hidden md:flex md:h-72 md:flex-col justify-center items-center gap-2'>
        <Typography className='flex text-center text-[#34D399] font-poppins font-semibold text-lg md:text-4xl capitalize'>
          tdee calculator
        </Typography>
        <Typography className='text-center text-[#869791] font-poppins font-semibold text-xs md:text-md capitalize'>
          please fill in you details
        </Typography>
      </div>
      <div className='md:w-[65%] w-auto flex flex-col justify-around items-center border rounded-[25px] border-green-500 px-2 py-3'>
        <div className='flex flex-row md:w-[50%] w-full justify-evenly items-center'>
          <Typography className='w-44 text-center font-poppins font-semibold text-white text-sm md:text-2xl capitalize'>
            gender
          </Typography>
          <div
            {...register('gender')}
            onClick={handleButtonClick}
            className='w-full transition-all duration-100 flex justify-around'
          >
            <Button
              onClick={() => reset({ ...watch(), gender: 'Male' })}
              className={`w-20 py-2 px-3 border border-green-500 rounded-xl ${
                gender === 'Male' ? 'bg-[#34D399]' : 'bg-[#132A2E]'
              }`}
            >
              male
            </Button>
            <Button
              onClick={() => reset({ ...watch(), gender: 'Female' })}
              className={`w-20 py-2 px-3 border rounded-xl border-green-500 ${
                gender === 'Female' ? 'bg-[#34D399]' : 'bg-[#132A2E]'
              }`}
            >
              female
            </Button>
          </div>
        </div>
        <div className='flex flex-col md:w-[50%] w-full justify-around items-center h-96 py-3'>
          <div className='md:w-96 w-72 flex flex-row items-center justify-around gap-1'>
            <label className='w-full text-center md:text-start font-poppins font-semibold text-sm md:text-2xl text-white capitalize'>
              age
            </label>
            <div className='flex flex-col gap-2'>
              <div className='w-full flex justify-end'>
                <input
                  {...register('age', { valueAsNumber: true })}
                  type='number'
                  name='age'
                  placeholder='please input your age'
                  className='bg-[#132A2E] rounded-md border border-green-500 px-3 py-2 focus:outline-none shadow-sm focus:ring-2 ring-green-500 focus:border-green-500 md:w-64 w-52 h-9 text-sm md:text-lg text-white'
                />
              </div>
              {errors.age && (
                <Typography className='font-poppins font-semibold text-sm md:text-lg md:text-center text-red-900 text-center'>
                  {errors.age.message}
                </Typography>
              )}
            </div>
          </div>
          <div className='md:w-96 w-72 flex flex-row items-center justify-around gap-1'>
            <label className='w-full text-center font-poppin md:text-start font-semibold text-sm text-white capitalize md:text-2xl'>
              weight
            </label>
            <div className='flex flex-col gap-2'>
              <div className='w-full flex items-center justify-end'>
                <input
                  {...register('weight', { valueAsNumber: true })}
                  type='number'
                  name='weight'
                  placeholder='please input your weight'
                  className='bg-[#132A2E] rounded-md border border-green-500 px-3 py-2 focus:outline-none shadow-sm focus:ring-2 ring-green-500 focus:border-green-500 md:w-64 w-52 h-9 text-sm md:text-lg text-white'
                />
              </div>
              {errors.weight && (
                <Typography className='font-poppins font-semibold text-sm md:text-lg text-red-900 text-center'>
                  {errors.weight.message}
                </Typography>
              )}
            </div>
          </div>
          <div className='md:w-96 w-72 flex flex-row items-center justify-evenly gap-1 md:text-2xl'>
            <label className='w-full md:text-start text-center font-poppins font-semibold text-sm text-white capitalize md:text-2xl'>
              height
            </label>
            <div className='flex flex-col gap-2'>
              <div className='w-full flex justify-end'>
                <input
                  {...register('height', { valueAsNumber: true })}
                  type='number'
                  name='height'
                  placeholder='please input your height'
                  className='bg-[#132A2E] rounded-md border border-green-500 px-3 py-2 focus:outline-none shadow-sm focus:ring-2 ring-green-500 focus:border-green-500 md:w-64 w-52 h-9 text-sm md:text-lg text-white'
                />
              </div>
              {errors.height && (
                <Typography className='font-poppins font-semibold text-sm md:text-lg text-red-900 text-center'>
                  {errors.height.message}
                </Typography>
              )}
            </div>
          </div>
          <div className='flex flex-row w-full justify-evenly items-center'>
            <Typography className='w-full md:w-auto text-center font-poppins font-semibold text-white text-sm md:text-2xl capitalize'>
              goal
            </Typography>
            <div
              onClick={handleButtonClick}
              className='w-full gap-2 md:gap-1 transition-all duration-100 flex justify-evenly md:justify-end'
            >
              <Button
                onClick={() => reset({ ...watch(), goal: 'MaintainWeight' })}
                className={`w-14 md:w-32 py-2 md:px-3 px-1 border rounded-xl border-green-500 text-[9px]  ${
                  goal === 'MaintainWeight'
                    ? 'bg-[#34D399] w-24'
                    : 'bg-[#132A2E]'
                }`}
              >
                Maintain Weight
              </Button>
              <Button
                onClick={() => reset({ ...watch(), goal: 'LoseWeight' })}
                className={`w-14 md:w-32 py-2 md:px-3 px-1 border border-green-500 rounded-xl text-[9px]  ${
                  goal === 'LoseWeight' ? 'bg-[#34D399] w-24' : 'bg-[#132A2E]'
                }`}
              >
                Lose Weight
              </Button>
              <Button
                onClick={() => reset({ ...watch(), goal: 'GainWeight' })}
                className={`w-14 md:w-32 py-2 md:px-3 px-1 border rounded-xl border-green-500 text-[10px]  ${
                  goal === 'GainWeight' ? 'bg-[#34D399] w-24' : 'bg-[#132A2E]'
                }`}
              >
                Gain Weight
              </Button>
            </div>
          </div>
          <div className='md:w-96 w-72 flex flex-row items-center justify-center gap-1'>
            <label className='w-full text-center font-poppins font-semibold text-sm text-white md:text-start capitalize md:text-2xl'>
              activity
            </label>
            <div className='w-full flex justify-end'>
              <select
                {...register('activity_level')}
                className='bg-[#34D399] rounded-md border-green-500 text-white focus:outline-none shadow-sm focus:ring-2 ring-green-500 px-3 py-2 focus:border-green-500 w-52 md:w-64 md:h-12 h-9 text-sm md:text-lg'
              >
                {ActivityLevel.map((value, id: number) => (
                  <option className='w-20 bg-green-500' key={id} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Button
          onClick={() => handleSubmit(fetchDataTdee)()}
          className='w-44 md:w-60 h-7 md:h-12 flex justify-center items-center capitalize rounded-md bg-[#34D399] text-sm md:text-2xl text-white hover:scale-125'
        >
          calculate now !
        </Button>
      </div>
      <div className='w-full'>
        <TdeeCalculationComponent
          bmi={calculateTdee?.bmi ?? 0}
          tdee={calculateTdee?.tdee ?? 0}
          bmiCategory={calculateTdee?.bmiCategory ?? 'N/A'}
          goal={calculateTdee?.goal}
          onClick={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => handleSubmit(fetchDataTdee)()}
          onSave={handleSaveTdee}
        />
      </div>
    </div>
  );
};

export default TdeeCalculatorPage;
