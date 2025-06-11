import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Typography } from '@material-tailwind/react';
import { toast } from 'react-toastify';

import {
  getMealHistory,
  EditSelectedFood,
  DeleteSelectionMeal
} from '@/services/mealService';
import type {
  MealHistory,
  MealHistoryFood as ServiceMealHistoryFood
} from '@/services/mealService'; // Alias imported type
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface EditableMealHistoryFood extends ServiceMealHistoryFood {
  quantity: number;
}

interface EditableMealHistory extends Omit<MealHistory, 'foods'> {
  foods: EditableMealHistoryFood[];
}

const EditMealPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const mealId = typeof id === 'string' ? parseInt(id, 10) : null;
  const { data: session } = useSession();
  const userId = session?.user.userId as number;
  const accessToken = session?.user.accessToken as string;

  const [meal, setMeal] = useState<EditableMealHistory | null>(null);
  const [mealHistory, setMealHistory] = useState<MealHistory[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchSpecificMealData = async () => {
    if (mealId === null) return;
    try {
      setLoading(true);
      const history = await getMealHistory({ userId, accessToken });
      const specificMeal = history.find((m: any) => m.id === mealId);

      if (specificMeal) {
        console.log('Fetched specificMeal:', specificMeal);
        const editableFoods: EditableMealHistoryFood[] = specificMeal.foods.map(
          (food: any) => ({
            ...food,
            quantity: food.quantity
          })
        );
        setMeal({
          ...specificMeal,
          foods: editableFoods
        });
      } else {
        toast.error('Meal not found');
        router.push('/meal-history');
      }
    } catch (error) {
      toast.error('Failed to fetch meal data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchSpecificMealData();
  }, [mealId, userId, accessToken]);

  const handleFoodQuantityChange = (index: number, quantity: number) => {
    if (!meal) return;
    const newFoods = [...meal.foods];
    newFoods[index] = {
      ...newFoods[index],
      quantity: quantity
    };
    setMeal({ ...meal, foods: newFoods });
  };

  const handleRemoveFood = async (idToRemove: number) => {
    if (!meal) return;

    try {
      // Call the delete service to remove the food entry from the backend
      await DeleteSelectionMeal({
        foodEntryId: idToRemove
      });

      // Update the local state to reflect the deletion
      const newFoods = meal.foods.filter((food) => food.id !== idToRemove);
      setMeal({ ...meal, foods: newFoods });
      toast.success('Food item deleted successfully!');
      // Re-fetch meal data to update remaining calories
      await fetchSpecificMealData();
    } catch (error) {
      toast.error('Failed to delete food item');
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (!meal) return;
    try {
      for (const food of meal.foods) {
        await EditSelectedFood({
          foodEntryId: Number(food.id),
          quantity: Number(food.quantity)
        });
      }
      toast.success('Meal updated successfully!');
      router.push('/meal-history');
    } catch (error) {
      toast.error('Failed to update meal');
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.push('/meal-history'); // Redirect back without saving
  };

  // Keep grouping function
  const groupFoodsByMealType = (foods: EditableMealHistoryFood[]) => {
    return foods.reduce(
      (acc, food) => {
        if (!acc[food.mealType]) {
          acc[food.mealType] = [];
        }
        acc[food.mealType].push(food);
        return acc;
      },
      {} as Record<string, EditableMealHistoryFood[]>
    );
  };

  // Keep label function
  // const getMealTypeLabel = (type: string) => {
  //   const labels: Record<string, string> = {
  //     breakfast: 'Breakfast',
  //     lunch: 'Lunch',
  //     dinner: 'Dinner',
  //     snack: 'Snack'
  //   };
  //   return labels[type] || type;
  // };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Typography className='text-white'>Loading...</Typography>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Typography className='text-white'>Meal not found</Typography>
      </div>
    );
  }

  return (
    <div className='w-full container mx-auto px-4 py-8 h-full'>
      <div className='max-w-2xl mx-auto md:w-full'>
        <Typography variant='h3' className='text-[#34D399] mb-8'>
          Edit Meal History Entry
        </Typography>

        <div className='space-y-6 md:w-full'>
          {/* Date Display (Read-only) */}
          <div>
            <Typography className='text-white mb-2'>Date:</Typography>
            <Typography className='text-gray-300 font-semibold'>
              {meal.date.split('T')[0]}
            </Typography>
          </div>

          {/* Summary Info Display (Read-only) */}
          <div className='flex flex-wrap gap-4 text-sm'>
            <div className='bg-[#1e3a3d] px-3 py-1 rounded-lg'>
              <p className='text-gray-400'>
                Calories: {meal?.totalCalories}
                <span className='text-white font-bold'></span>
              </p>
            </div>
            <div className='bg-[#1e3a3d] px-3 py-1 rounded-lg'>
              <p className='text-gray-400'>
                TDEE Result:{' '}
                <span className='text-white font-bold'>{meal.tdeeResult}</span>
              </p>
            </div>
            <div className='bg-[#1e3a3d] px-3 py-1 rounded-lg'>
              <p className='text-gray-400'>
                Remaining:{' '}
                <span className='text-white font-bold'>
                  {meal?.calorieRemaining.toFixed(0)}
                </span>
              </p>
            </div>
          </div>

          {/* Foods List with Edit/Delete */}
          <div className='w-full flex flex-col'>
            <Typography className='text-white mb-4'>Foods Consumed:</Typography>
            <div className='grid gap-4'>
              <div className='grid gap-4'>
                {Object.entries(groupFoodsByMealType(meal.foods)).map(
                  ([mealType, foods]) => (
                    <div key={mealType} className='bg-[#132A2E] rounded-lg'>
                      <Typography className='text-[#34D399] font-semibold mb-3 capitalize'>
                        food list
                      </Typography>
                      <div className='space-y-3'>
                        {foods.map((food) => (
                          <div
                            key={food.id}
                            className='flex items-center justify-between gap-4 p-3 rounded-lg bg-[#1e3a3d] border border-green-500 w-72 md:w-full'
                          >
                            <Image
                              src={
                                food.imageUrl
                                  ? food.imageUrl.startsWith('http')
                                    ? food.imageUrl
                                    : food.imageUrl.startsWith('/images/')
                                      ? `http://localhost:8000${food.imageUrl}`
                                      : `http://localhost:8000/images/${food.imageUrl}`
                                  : 'https://via.placeholder.com/40'
                              }
                              alt={food.name}
                              width={40}
                              height={40}
                              className='w-10 h-10 object-cover rounded-full'
                            />
                            <div className='flex flex-col gap-2 items-center justify-center'>
                              <Typography className='text-white font-normal font-poppins text-sm md:text-lg'>
                                {food.name}
                              </Typography>
                              <Typography className='text-white font-normal font-poppins text-[12px] md:text-lg'>
                                {food.calories} calories per {food.unit}
                              </Typography>
                            </div>
                            <div className='flex items-center gap-2'>
                              <input
                                type='number'
                                value={food.quantity}
                                onChange={(e) =>
                                  handleFoodQuantityChange(
                                    meal.foods.findIndex(
                                      (f) => f.id === food.id
                                    ),
                                    Number(e.target.value)
                                  )
                                }
                                className='text-white w-16 bg-[#132A2E] rounded-lg focus:ring-2 focus:ring-white text-center border'
                                min={1}
                              />
                              <Button
                                variant='outlined'
                                onClick={() =>
                                  handleRemoveFood(Number(food.id))
                                }
                                className='text-[#D33434] border-[#D33434] p-2'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className='w-full h-32 items-start justify-center flex'>
            <div className='flex justify-center gap-4 mt-8'>
              <Button
                variant='outlined'
                onClick={handleCancel}
                className='text-[#D33434] border-[#D33434] hover:bg-[#D33434]/10'
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className='bg-[#34D399] text-white hover:bg-[#34D399]/90'
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMealPage;
