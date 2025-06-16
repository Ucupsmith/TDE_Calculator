import {
  Avatar,
  Button,
  Card,
  CardBody,
  checkbox,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export interface MealResponse {
  id: number;
  name: string;
  calories: number;
  unit: string | number;
  imageUrl: string;
  isCustom?: boolean;
}

interface MealPlanProps {
  data: MealResponse[];
  onSelect: (food: MealResponse, checked: boolean) => void;
  onSave: () => void;
  loading: boolean;
  checkBox?: number;
  onClick?: number;
  selectedFoods: MealResponse[];
  onRemove: (food: MealResponse, checked: boolean) => void;
}

const title = ['image', 'food', 'unit', 'delete'];

const MealPlanSection3: React.FC<MealPlanProps> = ({
  data,
  onSelect,
  onSave,
  loading = false,
  selectedFoods,
  onRemove
}) => {
  const [saveButton, setSaveButton] = useState<boolean>(false);
  const [selectedFoodSection, setSelectedFoodSection] =
    useState<boolean>(false);
  const [titleSelection, setTitleSelection] = useState<number>(0);
  const handlePopUpFood = () => {
    setSelectedFoodSection(!selectedFoodSection);
  };
  const { push } = useRouter();
  const handleSave = async () => {
    try {
      await onSave();
      setSaveButton(!saveButton);
    } catch (error) {
      console.log('Error save mealplans!', error);
    }
  };

  const handleRemoveFood = (food: MealResponse) => {
    onRemove(food, false);
  };

  React.useEffect(() => {
    if (selectedFoods) {
      setTitleSelection(selectedFoods.length);
    }
  }, [selectedFoods]);

  const findFoodByName = (data || []).filter((food) => {
    const filterFood =
      food.name.toLowerCase() && food.unit.toLocaleString('id-Id');
    if (filterFood !== null && filterFood !== '') {
      return filterFood;
    } else {
      return filterFood.toLowerCase();
    }
  });

  return (
    <div className='w-full'>
      {!loading ? (
        <div className='flex flex-col gap-3 px-2'>
          <Typography className='font-poppins font-normal text-green-500 text-lg md:text-lg  capitalize'>
            Lets choose how you prepare your meal
          </Typography>
          {selectedFoods.length > 0 && (
            <div className='w-full flex flex-col justify-center px-3 items-end gap-3 py-3 duration-75 animate-fade-in-slide transition-all'>
              <div
                onClick={handlePopUpFood}
                className='border-[3px] border-green-500 w-auto py-2 px-3 bg-[#132A2E] rounded-xl shadow-md shadow-green-500 text-green-900 hover:bg-blue-gray-600 '
              >
                <Typography className='text-white font-poppins font-semibold text-sm md:text-xl capitalize flex text-center'>
                  {`${titleSelection} selected`}
                </Typography>
              </div>
              {selectedFoodSection && (
                <div className='flex flex-col items-center justify-center border-[3px] border-green-500 w-full py-2 px-3 bg-[#132A2E] rounded-xl shadow-md shadow-green-500 text-green-900 duration-75 transition-none animate-fade-in'>
                  <div className='w-full flex flex-row justify-between items-center px-0 py-1'>
                    {title.map((t, idx: number) => (
                      <Typography
                        key={idx}
                        className='text-green-500 font-poppins font-semibold text-lg md:text-xl capitalize flex text-center'
                      >
                        {t}
                      </Typography>
                    ))}
                  </div>
                  {selectedFoods.length > 0 &&
                    selectedFoods.length !== null &&
                    selectedFoods.map((food) => {
                      return (
                        <div
                          key={food.id}
                          className='w-full flex flex-row justify-between items-center px-0 py-1 text-center'
                        >
                          <Image
                            src={
                              food.imageUrl
                                ? food.imageUrl.startsWith('http://') ||
                                  food.imageUrl.startsWith('https://')
                                  ? food.imageUrl
                                  : `${process.env.NEXT_PUBLIC_IMAGE_API_URL}${food.imageUrl.replace('/images/', '')}`
                                : food.imageUrl
                            }
                            alt={food.imageUrl}
                            className='w-7 h-5'
                            width={100}
                            height={100}
                          />
                          <Typography className='w-full text-white font-poppins font-semibold text-sm md:text-xl capitalize text-end'>
                            {food.name}
                          </Typography>
                          <Typography className='w-full text-white font-poppins font-semibold text-sm md:text-xl capitalize text-center'>
                            {food.unit}
                          </Typography>
                          <div className='flex items-center justify-center border-red-900 bg-[#132A2E]'>
                            <Button
                              variant='outlined'
                              onClick={() => handleRemoveFood(food)}
                              className='text-[#D33434] border-[#D33434] py-1 px-2'
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
                      );
                    })}
                </div>
              )}
            </div>
          )}
          <div className='w-full flex flex-wrap justify-center items-start gap-4 md:px-0'>
            {data?.length > 0 && data?.length !== null ? (
              data?.map((food) => {
                const currentFoodId = Number(food.id);
                const isCheked = selectedFoods.some(
                  (selected) => selected.id === currentFoodId
                );
                return (
                  <label key={food.id} className='relative cursor-pointer'>
                    <input
                      type='checkbox'
                      className='peer hidden'
                      onChange={(e) => onSelect(food, e.target.checked)}
                      checked={isCheked}
                    />
                    <div className='absolute top-2 right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 peer-checked:opacity-100 transition-opacity duration-200'>
                      ✓
                    </div>
                    <div
                      key={food.id}
                      className='w-full md:w-40 lg:w-full rounded-xl peer-checked:ring-2 peer-checked:ring-seeds-green 
                peer-checked: transition-all 
                '
                    >
                      <div className='md:w-full border-[3px] border-seeds-green rounded-lg flex flex-col items-center justify-between py-3 px-2 bg-[#132A2E] gap-3 h-60 shadow-lg shadow-green-500'>
                        <div className='flex flex-col gap-2 w-full items-center justify-center'>
                          <Image
                            src={
                              food.imageUrl
                                ? food.imageUrl.startsWith('http://') ||
                                  food.imageUrl.startsWith('https://')
                                  ? food.imageUrl
                                  : `${process.env.NEXT_PUBLIC_IMAGE_API_URL}${food.imageUrl.replace('/images/', '')}`
                                : food.imageUrl
                            }
                            alt={food.imageUrl}
                            width={50}
                            height={200}
                            className='flex items-center justify-center text-center bg-[#132A2E] w-40 h-20 text-white px-3 py-2'
                          />
                        </div>
                        <div className='w-full flex justify-center gap-2'>
                          <Typography className='text-white font-poppins font-semibold text-sm md:text-xl capitalize flex text-center'>
                            {`${food.name.length > 15 ? food.name.slice(0, 17) : food.name}`}
                          </Typography>
                        </div>
                        <div className='flex flex-row gap-2 w-full justify-center'>
                          <Typography className='text-green-500 font-poppins font-normal text-[14px] md:text-xl capitalize'>
                            {food.unit}
                          </Typography>
                        </div>
                        <div className='flex flex-row gap-2 w-full items-center justify-center'>
                          <Typography className='text-green-500 font-poppins font-normal text-xs md:text-xl capitalize'>
                            {food.calories} cal
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })
            ) : (
              <div className='w-full px-2 h-auto flex items-center justify-center'>
                <div className='w-full md:w-72 h-52 rounded-lg flex flex-col items-center justify-center gap-2 px-2 py-3 border-2 border-green-500 shadow-lg shadow-green-500 text-center'>
                  <Typography className='font-poppins font-semibold text-lg md:text-xl text-white shadow-sm capitalize '>
                    oops cannot reach the food
                  </Typography>
                  <Typography className='font-poppins font-semibold text-sm md:text-sm shadow-sm capitalize text-white'>
                    try using the search button
                  </Typography>
                  <Typography className='font-poppins font-semibold text-sm md:text-sm shadow-sm capitalize text-white'>
                    or
                  </Typography>
                  <Typography
                    onClick={() => {
                      window.scrollTo({
                        top: document.body.scrollTop,
                        behavior: 'smooth'
                      });
                    }}
                    className='font-poppins font-semibold text-sm md:text-sm shadow-sm capitalize text-green-900 underline'
                  >
                    add a custom food!
                  </Typography>
                </div>
              </div>
            )}
          </div>
          {selectedFoods.length > 0 ? (
            <div className='w-full flex justify-center items-center h-16 fixed bottom-16 px-3 right-0 duration-75 transition-all animate-fade-in ease-in-out z-50'>
              <Button
                onClick={() => handleSave()}
                className='bg-green-500 rounded-full w-64 h-10'
              >
                save
              </Button>
            </div>
          ) : (
            <div className='w-full flex justify-center items-center h-6'>
              {findFoodByName.length === 0 ||
                (findFoodByName.length === null ? (
                  <Button
                    onClick={handleSave}
                    className='bg-green-500 rounded-full w-64 h-16 hidden'
                  >
                    save
                  </Button>
                ) : (
                  <Button
                    onClick={handleSave}
                    className='bg-green-500 rounded-full w-64 h-10 mt-10'
                  >
                    save
                  </Button>
                ))}
            </div>
          )}
          {saveButton && (
            <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50'>
              <div className='border bg-white w-64 h-40 flex flex-col rounded-lg items-center gap-4 justify-center'>
                <Typography className='font-poppins font-semibold text-green-500 text-lg capitalize text-center'>
                  meal selection saved successfull
                </Typography>
                <Typography
                  onClick={() => push('/meal-history')}
                  className='font-poppins font-semibold text-blue-500 text-xs capitalize text-center underline'
                >
                  see the collection
                </Typography>
                <Button
                  onClick={() => setSaveButton(false)}
                  className='bg-green-500 font-poppins font-semibold text-white text-lg capitalize h-4 flex items-center justify-center'
                >
                  oke
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        loading
      )}
    </div>
  );
};

export default MealPlanSection3;
