import { useTdee } from '@/common/TdeeProvider';
import NotificationManager from '@/components/NotificationManager';
import MealPlanCustom from '@/components/meal-plan/MealPlanSection2';
import MealPlanSection3, {
  MealResponse
} from '@/components/meal-plan/MealPlanSection3';
import PaginationControls from '@/components/pagination-controls/PaginationControls';
import { CustomMealType, useCustomInputMeal } from '@/hooks/useCustomInputMeal';
import {
  addMainUserFoods,
  getMainUserFoods,
  getMealCalculateMeals
} from '@/repository/mealplan.repository';
import {
  Button,
  Card,
  CardBody,
  checkbox,
  Progress,
  Typography
} from '@material-tailwind/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import DangerButton from '@/assets/mealplan/dangerbutton.svg';
import LoadingMealPlan from '@/assets/mealplan/loadingmealplanpng-removebg-preview.png';
import Image from 'next/image';
import MealPlanEmptyState from '@/assets/mealplan/malplanemptystate-removebg-preview.png';
import Link from 'next/link';
import SearchIcon from '@/assets/mealplan/SearchIcon-removebg-preview.png';
import MealPlanSearchComponent from '@/components/meal-plan/MealPlanSearchComponent';

interface MealRemainingResponse {
  totalCalories: number;
  remainingCalories: string;
  tdeeGoal: string;
  goal: string;
  isNewDay: boolean;
}

interface MealCalculate {
  tdeeId: number;
  userId: number;
  accessToken: string;
}

export interface CustomFoodsProps {
  id: number;
  name: string;
  calories: number;
  unit: string | number;
  isCustom?: boolean;
}
export interface MainFoodsProps {
  name: string;
  calories: number;
  unit: string | number;
  isCustom?: boolean;
}

interface MainFoodsPayload {
  userId: number;
  accessToken: string;
  foods: MainFoodsProps[];
}

interface MealPayload {
  id: number;
  name: string;
  calories: number;
  unit: string | number;
  isCustom?: boolean;
}
const MealPlanPage = () => {
  const { data: session, status } = useSession();
  const userId = Number(session?.user.userId);
  const accessToken = session?.user.accessToken as string;
  const { tdeeId } = useTdee();
  const [allCustomFoods, setAllCustomFoods] = useState<CustomFoodsProps[]>([]);
  const [mealRemaining, setMealRemaining] =
    useState<MealRemainingResponse | null>(null);
  const [mainFoods, setMainFoods] = useState<MealResponse[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<MealPayload[]>([]);
  const [searchFoods, setSearchFoods] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const calculatedFoods = [...selectedFoods, ...allCustomFoods];
  const itemsPerPage = 12;
  const LastItemsIndex = currentPage * itemsPerPage;
  const FirstItemsIndex = LastItemsIndex - itemsPerPage;
  const paginationMainFoods = Array.isArray(mainFoods)
    ? mainFoods.slice(FirstItemsIndex, LastItemsIndex)
    : [];
  const safeSelectedFoods = Array.isArray(selectedFoods) ? selectedFoods : [];
  const totalCaloriesCustomFoods = allCustomFoods.reduce(
    (acc, food) => acc + Number(food.calories) * Number(food.unit),
    0
  );
  const totalCaloriesSelectedFoods = safeSelectedFoods.reduce(
    (acc, food) => acc + Number(food.calories),
    0
  );

  const displayTotalCalories =
    (mealRemaining?.totalCalories ? Number(mealRemaining.totalCalories) : 0) +
    totalCaloriesCustomFoods +
    totalCaloriesSelectedFoods;

  const tdeeGoal = Number(mealRemaining?.tdeeGoal).toFixed(0);
  const percentage =
    tdeeGoal && displayTotalCalories !== 0
      ? (displayTotalCalories / Math.floor(Number(tdeeGoal))) * 100
      : 0;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useCustomInputMeal();
  const unit = watch('unit');
  const handleClickCustom = () => {
    setButtonClicked(!buttonClicked);
  };
  const handleIncrement = () => {
    setValue('unit', unit + 1);
  };

  const handleDecrement = () => {
    setValue('unit', unit > 1 ? unit - 1 : unit);
  };

  const fetchDataGetMeal = useCallback(async (): Promise<void> => {
    if (!tdeeId) {
      console.warn('tdeeId belum tersedia, tidak bisa fetch meal plan.');
      return;
    }
    try {
      setLoading(true);
      const payload: MealCalculate = {
        tdeeId: tdeeId,
        userId: userId,
        accessToken: accessToken
      };
      const response = await getMealCalculateMeals(payload);
      if (response) {
        setMealRemaining(response);
      } else {
        setMealRemaining(null);
        console.log('MealRemaining null:', response);
      }
    } catch (error) {
      console.log(`error get meal remaining: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [tdeeId, userId, accessToken]);

  const fetchDataFoods = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const payload = {
        name: searchFoods
      };
      const response = await getMainUserFoods(payload);
      if (Array.isArray(response)) {
        setMainFoods(response);
      } else {
        setMainFoods([]);
      }
    } catch (error) {
      console.log(`Error Retrieving Data Foods : ${error}`);
    } finally {
      setLoading(false);
    }
  }, [searchFoods]);

  const fetchDataPostMainFoods = async (): Promise<void> => {
    if (status === 'authenticated') {
      try {
        const payload: MainFoodsPayload = {
          userId: userId,
          accessToken: accessToken,
          foods: calculatedFoods
        };
        const response = await addMainUserFoods(payload);
        if (response) {
          console.log('berhasil ke kirim ke server!', response);
        } else {
          setSelectedFoods([]);
        }
        console.log('error fetching data:', response);
      } catch (error) {
        console.log('error retrieving data:', error);
      }
    }
  };

  // Auto-save function
  const autoSave = useCallback(() => {
    localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods));
    localStorage.setItem('allCustomFoods', JSON.stringify(allCustomFoods));
    console.log('Auto-saved meal plan data');
  }, [selectedFoods, allCustomFoods]);

  // Auto-save when selected foods or custom foods change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedFoods.length > 0 || allCustomFoods.length > 0) {
        autoSave();
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timer);
  }, [selectedFoods, allCustomFoods, autoSave]);

  const handleSelectedFoods = (food: MealPayload, checked: boolean): void => {
    const safeFoodId = Number(food.id);
    if (checked === true) {
      setSelectedFoods((prev) => {
        const newSelectedFoods = [...prev, { ...food, id: safeFoodId }];
        return newSelectedFoods;
      });
    } else {
      setSelectedFoods((prev) => {
        const newSelectedFoods = prev.filter((selectedFood) => {
          return selectedFood.id !== safeFoodId;
        });
        return newSelectedFoods;
      });
    }
  };

  const handleSaveMeal = async () => {
    await fetchDataPostMainFoods();

    setAllCustomFoods([]);
    setSelectedFoods([]);
    reset();
    setButtonClicked(false);
    await fetchDataGetMeal();
    localStorage.removeItem('selectedFoods');
    localStorage.removeItem('allCustomFoods');
    if (!selectedFoods) {
      return <Typography className=''>u must select foods</Typography>;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveSearchFoods = async () => {
    void fetchDataFoods();

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const fetchAllData = useCallback(async () => {
    if (userId && tdeeId && accessToken) {
      await fetchDataGetMeal();
      await fetchDataFoods();
    }
  }, [fetchDataGetMeal, fetchDataFoods, userId, tdeeId, accessToken]);

  useEffect(() => {
    if (status === 'authenticated' && userId && tdeeId && accessToken) {
      // Load saved data from localStorage if exists
      const savedSelectedFoods = localStorage.getItem('selectedFoods');
      const savedCustomFoods = localStorage.getItem('allCustomFoods');
      
      if (savedSelectedFoods) {
        setSelectedFoods(JSON.parse(savedSelectedFoods));
      }
      if (savedCustomFoods) {
        setAllCustomFoods(JSON.parse(savedCustomFoods));
      }
      
      void fetchAllData();
    }
  }, [status, fetchAllData, userId, tdeeId, accessToken]);

  useEffect(() => {
    if (userId && tdeeId && accessToken) {
      console.log(
        'All conditions met in MealPlanPage, fetching meal data and foods...'
      );
    } else {
      console.log(
        'Conditions not met in MealPlanPage, not fetching initial data.'
      );
    }

    const storedSelectedFoods = localStorage.getItem('selectedFoods');
    const storedCustomFoods = localStorage.getItem('allCustomFoods');

    if (storedSelectedFoods) {
      setSelectedFoods(JSON.parse(storedSelectedFoods));
    }
    if (storedCustomFoods) {
      setAllCustomFoods(JSON.parse(storedCustomFoods));
    }
  }, [userId, tdeeId, accessToken, status]);

  useEffect(() => {
    localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods));
  }, [selectedFoods]);

  useEffect(() => {
    localStorage.setItem('allCustomFoods', JSON.stringify(allCustomFoods));
  }, [allCustomFoods]);

  const handleSaveCustomFood = (data: CustomMealType) => {
    const payload: CustomFoodsProps = {
      id: Date.now(), // Use timestamp as unique ID
      isCustom: true,
      name: data.name,
      calories: data.calories,
      unit: data.unit
    };
    setAllCustomFoods((prev) => [...prev, { ...payload }]);
    reset();
  };

  const handleDeleteCustomFood = (mealName: string) => {
    setAllCustomFoods((prev) => {
      const updatedFoods = prev.filter((meal) => meal.name !== mealName);
      return updatedFoods;
    });
  };

  if (loading) {
    return (
      <div className='fixed inset-0 z-50 bg-gray-900 bg-opacity-80 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-green-400 font-medium text-lg'>Loading your meal plan...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NotificationManager 
        tdeeId={tdeeId}
        enableTdeeReminder={true}
        enableMealPlanReminder={true}
      />
      <div className='w-full max-w-6xl mx-auto px-4 py-8'>
        {mealRemaining ? (
          <div className='bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800 mb-10 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10'>
            <div className='mb-6 text-center'>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent'>
                Daily Nutrition Tracker
              </h1>
              <div className='w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto mt-3'></div>
            </div>
            
            <div className='grid md:grid-cols-3 gap-6 mb-6'>
              <div className='bg-gray-800 p-5 rounded-xl border border-gray-700'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='p-2 bg-green-500/20 rounded-lg'>
                    <svg className='w-6 h-6 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                    </svg>
                  </div>
                  <div>
                    <p className='text-sm text-gray-400'>Daily Goal</p>
                    <p className='text-xl font-semibold text-white'>
                      {Math.ceil(Number(mealRemaining.tdeeGoal)).toLocaleString('id-ID')} kcal
                    </p>
                  </div>
                </div>
                <div className='mt-2'>
                  <p className='text-xs text-gray-400 capitalize'>
                    {mealRemaining.goal === 'MaintainWeight' 
                      ? 'Maintain Weight' 
                      : mealRemaining.goal === 'LoseWeight' 
                        ? 'Lose Weight' 
                        : mealRemaining.goal === 'GainWeight' 
                          ? 'Gain Weight' 
                          : mealRemaining.goal}
                  </p>
                </div>
              </div>

              <div className='bg-gray-800 p-5 rounded-xl border border-gray-700'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='p-2 bg-blue-500/20 rounded-lg'>
                    <svg className='w-6 h-6 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
                    </svg>
                  </div>
                  <div>
                    <p className='text-sm text-gray-400'>Consumed</p>
                    <p className={`text-xl font-semibold ${
                      displayTotalCalories > Number(mealRemaining.tdeeGoal) 
                        ? 'text-red-400' 
                        : 'text-blue-400'
                    }`}>
                      {displayTotalCalories.toLocaleString('id-ID')} kcal
                    </p>
                  </div>
                </div>
                <div className='mt-2'>
                  <p className='text-xs text-gray-400'>
                    {displayTotalCalories > Number(mealRemaining.tdeeGoal)
                      ? 'Over by ' + (displayTotalCalories - Number(mealRemaining.tdeeGoal)).toLocaleString('id-ID') + ' kcal'
                      : 'Remaining: ' + (Number(mealRemaining.tdeeGoal) - displayTotalCalories).toLocaleString('id-ID') + ' kcal'}
                  </p>
                </div>
              </div>

              <div className='bg-gray-800 p-5 rounded-xl border border-gray-700'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-purple-500/20 rounded-lg'>
                    <svg className='w-6 h-6 text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </div>
                  <div>
                    <p className='text-sm text-gray-400'>Progress</p>
                    <p className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                      {Math.min(100, Math.max(0, Math.floor(percentage)))}%
                    </p>
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='w-full bg-gray-700 rounded-full h-2.5'>
                    <div 
                      className={`h-2.5 rounded-full ${
                        percentage < 30 ? 'bg-green-500' :
                        percentage < 70 ? 'bg-yellow-500' :
                        percentage < 90 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className='w-full flex flex-row justify-center'>
            <div className='flex flex-col items-center gap-1 justify-center border-[5px] border-green-900 w-72 h-60 md:h-80 bg-[#132A2E] rounded-lg ring-green-500'>
              <Image
                src={MealPlanEmptyState}
                alt={String(MealPlanEmptyState)}
                className='w-32'
              />
              <Typography className='text-2xl md:text-3xl text-green-500 font-poppins font-semibold capitalize text-center'>
                you have not calculate tdee
              </Typography>
              <Typography className='text-xs md:text-sm text-green-500 font-poppins font-semibold capitalize text-center underline'>
                <Link href={`/tdee-calculator`}> calculate your tdee now!</Link>
              </Typography>
            </div>
          </div>
        )}
        <div className='w-full mb-8'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent'>
              Custom Meal
            </h2>
            <button
              onClick={handleClickCustom}
              className='flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                {buttonClicked ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 12H4' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                )}
              </svg>
              <span>{buttonClicked ? 'Close Form' : 'Add Custom Meal'}</span>
            </button>
          </div>
          {buttonClicked && (
            <div className='bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg transition-all duration-300'>
              <h3 className='text-xl font-semibold text-white mb-6'>Add Custom Meal</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Meal Name</label>
                  <div className='relative'>
                    <input
                      type='text'
                      className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                      placeholder='e.g., Grilled Chicken Salad'
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className='mt-1 text-sm text-red-400'>{errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Calories (per serving)</label>
                  <div className='relative'>
                    <input
                      type='number'
                      className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                      placeholder='e.g., 350'
                      {...register('calories', { valueAsNumber: true })}
                    />
                    {errors.calories && (
                      <p className='mt-1 text-sm text-red-400'>{errors.calories.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Servings</label>
                  <div className='flex items-center'>
                    <button
                      type='button'
                      onClick={handleDecrement}
                      className='p-2 bg-gray-800 rounded-l-lg border border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                    >
                      <svg className='w-5 h-5 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 12H4' />
                      </svg>
                    </button>
                    <input
                      type='number'
                      className='flex-1 px-4 py-3 bg-gray-800 border-t border-b border-gray-700 text-center text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      {...register('unit', { valueAsNumber: true })}
                    />
                    <button
                      type='button'
                      onClick={handleIncrement}
                      className='p-2 bg-gray-800 rounded-r-lg border border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                    >
                      <svg className='w-5 h-5 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                      </svg>
                    </button>
                  </div>
                  {errors.unit && (
                    <p className='mt-1 text-sm text-red-400'>{errors.unit.message}</p>
                  )}
                </div>

                <div className='flex items-end'>
                  <button
                    type='button'
                    onClick={handleSubmit(handleSaveCustomFood)}
                    className='w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20 transform hover:-translate-y-0.5'
                  >
                    Save Custom Meal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <MealPlanCustom data={allCustomFoods} onDelete={handleDeleteCustomFood} />
        <MealPlanSearchComponent
          onChange={setSearchFoods}
          placeholder='type foods...'
          value={searchFoods}
          onSubmit={handleSaveSearchFoods}
        />
        <MealPlanSection3
          data={paginationMainFoods}
          onSelect={handleSelectedFoods}
          onSave={handleSaveMeal}
          loading={loading}
          selectedFoods={selectedFoods}
        />
        <PaginationControls
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={mainFoods.length}
          onPageChanges={setCurrentPage}
        />
      </div>
    </>
  );
};

export default MealPlanPage;
