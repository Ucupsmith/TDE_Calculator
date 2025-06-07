import { MainFoodsProps } from '@/pages/meal-plan';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  checkbox,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react';

export interface MealResponse {
  id?: number;
  name: string;
  calories: number;
  unit: string;
  imageUrl: string; // Image from database
  isCustom?: boolean;
}

interface MealPayload {
  name: string;
  calories: number;
  unit: string;
  isCustom?: boolean;
}

interface MealPlanProps {
  data: MealResponse[];
  onSelect: (food: MealPayload, checked: boolean) => void;
  onSave: () => void;
  loading: boolean;
  checkBox?: number;
  onClick?: number;
}

const MealPlanSection3: React.FC<MealPlanProps> = ({
  data,
  onSelect,
  onSave,
  loading = false,
  checkBox
}) => {
  const [saveButton, setSaveButton] = useState<boolean>(false);
  const handleSave = async () => {
    try {
      await onSave();
    } catch (error) {
      console.log('Error save mealplans!', error);
    }
  };
  const handleSavebutton = () => {
    setSaveButton(!saveButton);
  };
  return (
    <div className='w-full'>
      {!loading ? (
        <div className='flex flex-col gap-3 px-3'>
          <Typography className='font-poppins font-normal text-green-500 text-lg md:text-lg  capitalize'>
            Lets choose how you prepare your meal
          </Typography>
          <div
            key={checkBox}
            className='w-full flex flex-wrap justify-center items-start gap-4 px-2 md:px-0'
          >
            {data?.length > 0 && data?.length !== null
              ? data?.map((food, idx: number) => {
                  return (
                    <label key={idx} className='relative cursor-pointer'>
                      <input
                        type='checkbox'
                        className='peer hidden'
                        onChange={(e) => onSelect(food, e.target.checked)}
                      />
                      <div className='absolute top-2 right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 peer-checked:opacity-100 transition-opacity duration-200'>
                        ✓
                      </div>
                      <div
                        key={food.id}
                        className='w-32 md:w-40 lg:w-full rounded-xl peer-checked:ring-[5px] peer-checked:ring-seeds-green peer-checked:ring-offset-2
                peer-checked: transition-all 
                '
                      >
                        <div className='border-[3px] border-seeds-green rounded-lg  flex flex-col items-center justify-between py-3 px-2 bg-[#132A2E] gap-3'>
                          <div className='flex flex-col gap-2 w-full items-center justify-center'>
                            <img
                              src={food.imageUrl}
                              alt=''
                              width={50}
                              height={200}
                              className='flex items-center justify-center text-center bg-[#132A2E] w-40 h-20 text-white px-3 py-2'
                            />
                          </div>
                          <div className='w-full flex justify-center gap-2'>
                            <Typography className='text-white font-poppins font-semibold text-xl md:text-xl capitalize'>
                              {`${food.name.length > 9 ? `${food.name.slice(0, 7)}` : food.name}`}
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
              : null}
          </div>
          <div className='flex justify-center items-center h-16'>
            <Button
              onClick={() => {
                handleSave();
                handleSavebutton();
              }}
              className='bg-green-500 rounded-full  w-64 h-10'
            >
              save
            </Button>
          </div>
          {saveButton && (
            <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50'>
              <div className='border bg-white w-64 h-40 flex flex-col rounded-lg items-center gap-4 justify-center'>
                <Typography className='font-poppins font-semibold text-green-500 text-lg capitalize text-center'>
                  meal selection saved successfull
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
        <div className='flex flex-col items-center justify-center h-36 w-20'>
          <Typography className=''>no result food found</Typography>
        </div>
      )}
    </div>
  );
};

export default MealPlanSection3;
