import TdeeCalculationComponent from '@/components/tdee-calculation/TdeeCalculationComponent';

import { TdeeFormType, useTdeeForm } from '@/hooks/useTdeeCalculation';
import {
  saveTdeeCalculation,
  saveTdeeCalculationToHome,
  tdeeCalculation,
  getTdeeCalcualation,
  getTdeeCalculationHome
} from '@/repository/tdee.repository';
import {
  Accordion,
  button,
  Button,
  Input,
  Typography
} from '@material-tailwind/react';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useTdee } from '@/common/TdeeProvider';
import LoadingTdee from '@/assets/tdee-calculator/loadingTdee.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  goal: string;
}

interface ActivityLevelType {
  value: string;
  description: string;
  examples: string;
}

const ActivityLevels: ActivityLevelType[] = [
  {
    value: 'Sedentary',
    description: 'Little to no exercise',
    examples: 'Desk job, mostly sitting, minimal walking'
  },
  {
    value: 'Lightly Active',
    description: 'Light exercise 1-3 days/week',
    examples: 'Walking, light housework, occasional sports'
  },
  {
    value: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week',
    examples: '30-60 mins of moderate exercise like brisk walking, cycling, or swimming'
  },
  {
    value: 'Very Active',
    description: 'Hard exercise 6-7 days/week',
    examples: '1-2 hours of intense exercise daily (gym, running, sports)'
  },
  {
    value: 'Extra Active',
    description: 'Very hard exercise & physical job or training 2x/day',
    examples: 'Athletes with intense training schedules or physically demanding jobs'
  }
];

const TdeeCalculatorPage = () => {
  const resultsSectionRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const userId = session?.user.userId as number;
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const parentResultsRef = useRef<HTMLDivElement>(null);
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
  const { setTdeeId } = useTdee();
  const fetchDataTdee = useCallback(
    async (data: TdeeFormType): Promise<void> => {
      try {
        setIsLoading(true);
        const payloadTdee = await tdeeCalculation({
          gender: data.gender,
          age: data.age,
          weight: data.weight,
          height: data.height,
          goal: data.goal,
          activity_level: data.activity_level
        });
        if (payloadTdee !== null && payloadTdee !== 0) {
          setCalculateTdee(payloadTdee);
          setIsModalOpen(payloadTdee);
        } else {
          setCalculateTdee(null);
        }
        if (!payloadTdee || typeof payloadTdee !== 'object') {
          setCalculateTdee(null);
          return;
        }

        if (typeof payloadTdee === 'string') {
          setCalculateTdee(null);
          return;
        }

        if (payloadTdee) {
          setCalculateTdee(payloadTdee);
          setIsModalOpen(true);
          // Let the child component handle the scroll and animation
          // The results will be scrolled to by the TdeeCalculationComponent
        } else {
          setCalculateTdee(null);
        }
      } catch (error) {
        setCalculateTdee(null);
      } finally {
        setIsLoading(false);
        reset({
          goal: 'MaintainWeight',
          gender: 'Male',
          activity_level: 'Sedentary'
        });
      }
    },
    [reset]
  );
  const handleSaveTdee = useCallback(async () => {
    if (!calculateTdee) {
      return;
    }
    const session = await getSession();
    const accessToken = session?.user.accessToken as string;
    const userId = session?.user.userId as number;
    try {
      setIsLoading(true);
      const payload: SaveTdeeCalculationInterface = {
        userId: userId,
        tdee_result: calculateTdee.tdee,
        accessToken: accessToken,
        goal: calculateTdee.goal
      };
      const response = await saveTdeeCalculationToHome(payload);
      if (response) {
        if (response.data && response.data.id) {
          setTdeeId(response.data.id);
        }
      }
      return response;
    } catch (error) {
      console.error('Error saving TDEE calculation:', error);
    } finally {
      setIsLoading(false);
    }
  }, [calculateTdee, setTdeeId]);
  // Fetch initial data when component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      const session = await getSession();
      if (session?.user?.userId) {
        // Get the latest saved TDEE data for this user
        try {
          const response = await getTdeeCalculationHome({
            userId: Number(session.user.userId),
            accessToken: session.user.accessToken as string
          });
          if (response && response.data && response.data.length > 0) {
            const latestTdee = response.data[response.data.length - 1];
            setCalculateTdee({
              bmi: 0, // You might want to fetch the actual BMI if available
              bmiCategory: '', // You might want to fetch the actual category if available
              tdee: Number(latestTdee.tdee_result),
              goal: latestTdee.goal
            });
          }
        } catch (error) {
          console.error('Error fetching TDEE data:', error);
        }
      }
    };
    void fetchInitialData();
  }, []); // Removed getSession from dependencies as it's not needed

  // Save TDEE calculation when it changes
  useEffect(() => {
    if (calculateTdee) {
      void handleSaveTdee();
    }
  }, [calculateTdee, handleSaveTdee]); // Added handleSaveTdee to dependencies
  const handleButtonClick = (): void => {
    setButtonClicked(!buttonClicked);
  };
  return (
    <div className='w-full md:items-center h-auto flex flex-col justify-evenly gap-3 md:space-y-10 '>
      <Typography className='text-center flex items-center justify-center md:hidden text-[#34D399] font-poppins font-semibold text-lg md:text-4xl capitalize h-20'>
        tdee calculator
      </Typography>
      <div className='hidden md:flex md:h-40 md:flex-col justify-center items-center gap-2'>
        <Typography className='flex text-center text-[#34D399] font-poppins font-semibold text-lg md:text-4xl capitalize'>
          tdee calculator
        </Typography>
        <Typography className='text-center text-[#869791] font-poppins font-semibold text-xs md:text-md capitalize'>
          please fill in you details
        </Typography>
      </div>
      <div className='md:w-[65%] w-auto flex flex-col justify-around items-center border rounded-[25px] border-green-500 px-2 py-3 shadow-lg shadow-green-500'>
        <div className='md:w-96 w-72 flex flex-row items-center'>
          <label className='w-24 md:w-32 text-center font-poppins font-semibold text-white text-sm md:text-2xl capitalize'>
            gender
          </label>
          <div className='flex-1'>
            <div
              {...register('gender')}
              onClick={handleButtonClick}
              className='transition-all duration-100 flex justify-end gap-2'
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
          <div className='md:w-96 w-72 flex flex-row items-center justify-around gap-1'>
            <label className='w-full text-center font-poppins font-semibold text-white text-sm md:text-2xl capitalize'>
              goal
            </label>
            <div className='w-full flex justify-end'>
              <div
                id="weight-goal-container"
                onClick={handleButtonClick}
                className='gap-2 md:gap-1 transition-all duration-100 flex'
              >
                <Button
                  id="maintain-weight-btn"
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
                  id="lose-weight-btn"
                  onClick={() => reset({ ...watch(), goal: 'LoseWeight' })}
                  className={`w-14 md:w-32 py-2 md:px-3 px-1 border border-green-500 rounded-xl text-[9px]  ${
                    goal === 'LoseWeight' ? 'bg-[#34D399] w-24' : 'bg-[#132A2E]'
                  }`}
                >
                  Lose Weight
                </Button>
                <Button
                  id="gain-weight-btn"
                  onClick={() => reset({ ...watch(), goal: 'GainWeight' })}
                  className={`w-14 md:w-32 py-2 md:px-3 px-1 border rounded-xl border-green-500 text-[10px]  ${
                    goal === 'GainWeight' ? 'bg-[#34D399] w-24' : 'bg-[#132A2E]'
                  }`}
                >
                  Gain Weight
                </Button>
              </div>
            </div>
          </div>
          <div className='md:w-96 w-72 flex flex-row items-center justify-center gap-1'>
            <label className='w-full text-center font-poppins font-semibold text-sm text-white md:text-start capitalize md:text-2xl'>
              activity
            </label>
            <div className='w-full flex justify-end'>
              <select
                {...register('activity_level', {
                  onChange: (e) => {
                    const selectedLevel = ActivityLevels.find(l => l.value === e.target.value);
                    if (selectedLevel) {
                      toast.info(
                        <div>
                          <p className='font-semibold'>{selectedLevel.value}</p>
                          <p className='text-sm'>{selectedLevel.description}</p>
                          <p className='text-xs text-gray-700 mt-1'>Contoh: {selectedLevel.examples}</p>
                        </div>,
                        {
                          position: 'top-center',
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          theme: 'light',
                          style: {
                            backgroundColor: '#34D399',
                            color: '#1F2937',
                            borderRadius: '0.5rem',
                            maxWidth: '300px',
                            margin: '0 auto',
                            textAlign: 'left',
                            padding: '0.75rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }
                        }
                      );
                    }
                  }
                })}
                className='bg-[#34D399] rounded-md border-green-500 text-white focus:outline-none shadow-sm focus:ring-2 ring-green-500 px-3 py-2 focus:border-green-500 w-52 md:w-64 md:h-12 h-9 text-sm md:text-lg cursor-pointer appearance-none'
              >
                {ActivityLevels.map((level, id) => (
                  <option key={id} value={level.value}>
                    {level.value}
                  </option>
                ))}
              </select>
              <ToastContainer />
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
      <div className='w-full' ref={parentResultsRef}>
        <TdeeCalculationComponent
          bmi={calculateTdee?.bmi ?? 0}
          tdee={calculateTdee?.tdee ?? 0}
          bmiCategory={calculateTdee?.bmiCategory ?? 'N/A'}
          goal={calculateTdee?.goal}
          onClick={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => handleSubmit(fetchDataTdee)()}
          onSave={handleSaveTdee}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default TdeeCalculatorPage;
