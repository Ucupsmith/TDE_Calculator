import { useTdee } from '@/common/TdeeProvider';
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
import React, { useEffect, useState } from 'react';
import DangerButton from '@/assets/mealplan/dangerbutton.svg';
import LoadingMealPlan from '@/assets/mealplan/loadingmealplanpng-removebg-preview.png';
import Image from 'next/image';
import MealPlanEmptyState from '@/assets/mealplan/malplanemptystate-removebg-preview.png';
import Link from 'next/link';

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
  const [onClick, setOnClick] = useState<boolean>(false);
  const [allCustomFoods, setAllCustomFoods] = useState<CustomFoodsProps[]>([]);
  const [mealRemaining, setMealRemaining] =
    useState<MealRemainingResponse | null>(null);
  const [mainFoods, setMainFoods] = useState<MealResponse[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<MealPayload[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const calculatedFoods = [...selectedFoods, ...allCustomFoods];
  const [checkBox, setCheckBox] = useState<number>(0);
  const { tdeeId } = useTdee();
  const itemsPerPage = 12;
  const LastItemsIndex = currentPage * itemsPerPage;
  const FirstItemsIndex = LastItemsIndex - itemsPerPage;
  const paginationMainFoods = mainFoods.slice(FirstItemsIndex, LastItemsIndex);
  const safeSelectedFoods = Array.isArray(selectedFoods) ? selectedFoods : [];
  const totalCaloriesCustomFoods = allCustomFoods.reduce(
    (acc, food) => acc + Number(food.calories) * Number(food.unit),
    0
  );
  const totalCaloriesSelectedFoods = safeSelectedFoods.reduce(
    (acc, food) => acc + Number(food.calories),
    0
  );
  const totalCalories = totalCaloriesCustomFoods + totalCaloriesSelectedFoods;
  const tdeeGoal = Number(mealRemaining?.tdeeGoal).toFixed(2);
  const percentage =
    tdeeGoal && totalCalories !== 0
      ? (totalCalories / Number(tdeeGoal)) * 100
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

  const fetchDataGetMeal = async (): Promise<void> => {
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
  };
  const fetchDataFoods = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await getMainUserFoods();
      if (response !== 0 && response !== 0) {
        setMainFoods(response);
      } else {
        setMainFoods([]);
      }
    } catch (error) {
      console.log(`Error Retrieving Data Foods : ${error}`);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSelectedFoods = (food: MealPayload, checked: boolean): void => {
    if (checked === true) {
      const payload: MealPayload = {
        id: food.id,
        name: food.name,
        calories: food.calories,
        unit: food.unit,
        isCustom: false
      };
      setSelectedFoods((prev) => [...prev, { ...payload }]);
    } else {
      const isSelectedArray = Array.isArray(selectedFoods) ? selectedFoods : [];
      setSelectedFoods(
        isSelectedArray.filter((meal) => meal.name !== food.name)
      );
    }
  };

  const handleSaveMeal = async () => {
    await fetchDataPostMainFoods();
    setCheckBox((prev) => prev + 1);
    setSelectedFoods(calculatedFoods);
    setAllCustomFoods([]);
    reset();

    setButtonClicked(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (userId && tdeeId && accessToken) {
      void handleSaveMeal();
    }
    void fetchDataGetMeal();
    void fetchDataFoods();
  }, [userId, tdeeId, accessToken]);

  const handleSaveCustomFood = (data: CustomMealType) => {
    const payload: CustomFoodsProps = {
      id: Number(data.id),
      isCustom: true,
      name: data.name,
      calories: data.calories,
      unit: data.unit
    };
    setAllCustomFoods((prev) => [...prev, { ...payload }]);
    reset();
  };

  const handleDeleteCustomFood = (mealName: string) => {
    setAllCustomFoods((prev) => prev.filter((meal) => meal.name !== mealName));
  };

  if (loading) {
    return (
      <div className='flex flex-col fixed inset-0 z-50 bg-opacity-50 bg-green-800'>
        <div className='flex flex-col items-center justify-center gap-3 h-full'>
          <Image src={LoadingMealPlan} alt='loading-meal-plan' />
          <Typography className='text-white font-poppins font-semibold text-center text-lg'>
            loading ...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full py-3 flex flex-col  items-center justify-center gap-10'>
      {mealRemaining ? (
        <div className='flex flex-col items-center w-full gap-4 px-2'>
          <Typography className='font-poppins font-semibold text-green-500 text-3xl md:text-xl capitalize'>
            meal plan
          </Typography>
          <span className='border-2 border-t-green-500 w-full'></span>
          <div className='md:w-full flex flex-col gap-10 justify-between items-start py-3 px-2'>
            <div className='md:w-full justify-between flex flex-row gap-3 items-end'>
              <Typography className='flex font-poppins font-normal text-green-500 text-lg md:text-xl capitalize'>
                calories per day
              </Typography>
              <Typography className='font-extralight font-poppins text-xs md:text-sm text-green-600 capitalize'>
                {`${mealRemaining.goal === 'MaintainWeight' ? 'Maintain Weight' : mealRemaining.goal === 'LoseWeight' ? 'Lose Weight' : mealRemaining.goal === 'GainWeight' ? 'Gain Weight' : mealRemaining.goal}`}
              </Typography>
            </div>
            <div className='flex flex-row w-full'>
              <Progress
                size='lg'
                className='border border-none bg-white ring-green-600 focus:bg-green-500'
                label={`reach`}
                value={Number(percentage.toFixed(2))}
                barProps={{
                  style: { width: `${percentage}%` },
                  className: `font-poppins font-semibold text-[10px] md:text-sm ${percentage <= 25 ? 'bg-yellow-500' : percentage <= 50 ? 'bg-green-500' : percentage <= 75 ? 'bg-orange-500' : percentage <= 100 ? 'bg-orange-900' : 'bg-red-900'}`
                }}
              />
            </div>
            <div className='md:w-full justify-center flex flex-row gap-2'>
              <div className='flex flex-row items-center justify-end gap-2'>
                <Typography
                  className={`font-poppins font-normal text-lg md:text-xl capitalize ${totalCalories > Number(mealRemaining.remainingCalories) ? 'text-red-900' : 'text-green-500'}`}
                >
                  {totalCalories}
                </Typography>
                <Typography className='font-poppins font-normal text-green-500 text-lg md:text-xl capitalize'>
                  /
                </Typography>
                <Typography className='font-extralight font-poppins text-lg md:text-xl text-green-600 capitalize'>
                  {Number(mealRemaining.remainingCalories).toLocaleString(
                    'id-ID',
                    {
                      style: 'decimal'
                    }
                  )}
                </Typography>
              </div>
              <div className='flex flex-row gap-1 justify-end items-center md:flex md:justify-evenly'>
                {totalCalories > Number(mealRemaining.remainingCalories) ? (
                  <Image
                    src={DangerButton}
                    alt=''
                    className='w-6 h-7 hover:scale-150'
                  />
                ) : null}
                <Typography
                  className={`font-extralight text-center font-poppins text-sm md:text-lg text-green-600 capitalize ${totalCalories > Number(mealRemaining.remainingCalories) ? 'text-red-600 text-[12px]' : ''}`}
                >
                  {totalCalories > Number(mealRemaining.remainingCalories)
                    ? 'Over Calories! You might gain weight.'
                    : 'Calories Remaining'}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full flex flex-row justify-center'>
          <div className='flex flex-col items-center gap-1 justify-center border-[5px] border-green-900 w-72 h-60 bg-[#132A2E] rounded-lg ring-green-500'>
            <Image
              src={MealPlanEmptyState}
              alt={String(MealPlanEmptyState)}
              className='w-32'
            />
            <Typography className='text-2xl md:text-3xl text-green-500 font-poppins font-semibold capitalize text-center'>
              you have not calculate tdee
            </Typography>
            <Typography className='text-xs md:text-3xl text-green-500 font-poppins font-semibold capitalize text-center underline'>
              <Link href={`/tdee-calculator`}> calculate your tdee now!</Link>
            </Typography>
          </div>
        </div>
      )}
      <div className='border-2 border-b-green-500 w-full'></div>
      <div className='flex flex-col gap-2 w-full items-start justify-between px-2'>
        <Typography className='font-poppins font-semibold text-lg md:text-2xl text-green-500 capitalize'>
          custom personal meal
        </Typography>
        <Button
          onClick={handleClickCustom}
          className='border rounded-xl border-green-500 py-3 px-2 w-32 h-15 md:w-40 bg-[#132A2E] text-sm md:text-lg  text-green-500'
        >
          {buttonClicked ? '- close meal' : '+ add meal'}
        </Button>
        {buttonClicked && (
          <Card className='w-full'>
            <CardBody className='flex flex-col items-center justify-between py-3 px-2 bg-[#132A2E] gap-3 border-[3px] border-green-400 rounded-xl '>
              <div className='flex flex-col gap-2 w-full'>
                <label className='text-green-500 font-poppins font-normal text-lg md:text-xl capitalize'>
                  custom meal
                </label>
                <input
                  type='text'
                  className='border border-green-500 rounded-xl bg-[#132A2E] w-full h-10 text-white px-3 py-2'
                  placeholder='custom meal'
                  {...register('name')}
                />
                {errors.name && (
                  <Typography className='text-red-900 font-poppins font-normal text-xs md:text-lg'>
                    {errors.name.message}
                  </Typography>
                )}
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <label className='text-green-500 font-poppins font-normal text-lg md:text-xl capitalize'>
                  meal kalori
                </label>
                <input
                  type='number'
                  className='border border-green-500 rounded-xl bg-[#132A2E] w-full h-10 text-white px-3 py-2'
                  placeholder='meal kalori'
                  {...register('calories', { valueAsNumber: true })}
                />
                {errors.calories && (
                  <Typography className='text-red-900 font-poppins font-normal text-xs md:text-lg'>
                    {errors.calories.message}
                  </Typography>
                )}
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <label className='text-green-500 font-poppins font-normal text-lg md:text-xl capitalize'>
                  amount meal
                </label>
                <div className='flex flex-row w-full gap-2 justify-between items-center md:flex md:justify-center md:gap-4'>
                  <div
                    onClick={handleDecrement}
                    className='border flex items-center justify-center border-green-500 rounded-full w-7 h-7 text-red-900'
                  >
                    -
                  </div>
                  <div className='flex flex-col gap-2 justify-center items-center'>
                    <input
                      type='number'
                      className='border border-green-500 rounded-xl bg-[#132A2E] w-full h-10 text-white px-3 py-2 text-center'
                      placeholder='quantity'
                      {...register('unit', { valueAsNumber: true })}
                    />
                    {errors.unit && (
                      <Typography className='t  ext-red-900 font-poppins font-normal text-xs md:text-lg'>
                        {errors.unit.message}
                      </Typography>
                    )}
                  </div>

                  <div
                    onClick={handleIncrement}
                    className='border flex items-center justify-center border-green-500 rounded-full w-7 h-7 text-green-500'
                  >
                    +
                  </div>
                </div>
                <div className='w-full justify-center flex flex-col items-center py-3'>
                  <Button
                    onClick={handleSubmit(handleSaveCustomFood)}
                    className='border border-green-500 rounded-xl bg-green-500 w-40 h-10 text-white px-3 py-2 capitalize'
                  >
                    save
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
      <MealPlanCustom data={allCustomFoods} onDelete={handleDeleteCustomFood} />
      <MealPlanSection3
        data={paginationMainFoods}
        onSelect={handleSelectedFoods}
        onSave={handleSaveMeal}
        loading={loading}
        checkBox={checkBox}
      />
      <PaginationControls
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={mainFoods.length}
        onPageChanges={setCurrentPage}
      />
    </div>
  );
};

export default MealPlanPage;
