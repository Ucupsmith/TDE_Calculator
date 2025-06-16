import { CustomFoodsProps } from '@/pages/meal-plan';
import {
  Avatar,
  button,
  Button,
  Card,
  CardBody,
  Typography
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import TrashBin from '@/assets/homepage/trashbinremv.png';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { type Swiper as SwiperInstance } from 'swiper';

interface MealCustomInterface {
  data: CustomFoodsProps[];
  onDelete: (id: number) => void;
  onSave: () => void;
}

interface CustomMealPagination {
  totalSlides: number;
  activeSlides: number;
  onClick: (idx: number) => void;
}

const CustomMealPagination: React.FC<CustomMealPagination> = ({
  totalSlides,
  activeSlides,
  onClick
}) => {
  return (
    <div className='flex w-full justify-center items-center gap-4'>
      {totalSlides !== 0 && totalSlides !== null
        ? Array.from({ length: totalSlides }).map((_, idx: number) => {
            return (
              <div
                onClick={() => {
                  onClick(idx);
                }}
                key={idx}
                className={`md:hidden flex cursor-pointer ${
                  activeSlides !== idx
                    ? 'rounded-[75px] h-2 w-2 bg-[#E9E9E9]'
                    : 'rounded-[75px] w-7 md:w-10 h-2 bg-green-500'
                }`}
              />
            );
          })
        : null}
    </div>
  );
};

const MealPlanCustom: React.FC<MealCustomInterface> = ({
  data,
  onDelete,
  onSave
}) => {
  console.log('data custom get food', data);
  const [activeSlides, setActiveSlides] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );
  const [buttonSave, setButtonSave] = useState<boolean>(false);

  useEffect(() => {
    if (swiperInstance !== null) {
      swiperInstance.on('slideChange', () => {
        setActiveSlides(swiperInstance.realIndex);
      });
    }
  }, [swiperInstance]);

  const handlePaginationClicked = (idx: number): void => {
    setActiveSlides(idx);
    if (swiperInstance !== null) {
      swiperInstance.slideToLoop(idx);
    }

    if (swiperInstance !== null) {
      swiperInstance.autoplay.start();
    }
  };

  const handleSave = async () => {
    await onSave();
    setButtonSave(!button);
  };

  return (
    <div className='w-full flex flex-col items-center justify-center gap-3'>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1 },
          720: { slidesPerView: 3 },
          1440: { slidesPerView: 5 }
        }}
        className='w-full gap-10 md:h-auto items-center justify-center flex'
        spaceBetween={20}
        modules={[Pagination]}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
      >
        <div className='flex flex-col gap-2 px-3 justify-center items-center'>
          <Typography className='font-poppins font-semibold text-lg md:text-xl text-green-800 capitalise'>
            your custom will appear here!
          </Typography>
          {data?.length > 0 && data?.length !== 0 && data?.length !== null ? (
            data?.map((meal) => {
              const totalCal = Number(meal.unit) * meal.calories;
              return (
                <SwiperSlide key={Number(meal.id)} className='w-full'>
                  <input type='checkbox' className='sr-only' />
                  <div className='flex flex-row gap-10'>
                    <Card className='w-full border cursor-pointer rounded-xl bg-white peer-checked:ring-blue-500 border-green-500 peer-checked:grayscale-0 active:scale-95 transition-all gap-10'>
                      <CardBody className='w-full flex h-40 flex-col items-center justify-between py-3 px-2 bg-[#132A2E] gap-3 border-[3px] rounded-lg border-green-500 shadow-md shadow-green-500'>
                        <div className='w-full flex flex-row justify-end'>
                          <Image
                            src={TrashBin}
                            alt=''
                            className='w-5 h-5'
                            onClick={() => {
                              onDelete(meal.id);
                            }}
                          />
                        </div>
                        <div className='w-full flex justify-center gap-2'>
                          <Typography
                            className={`text-white font-poppins font-semibold text-xl md:text-xl capitalize md:${meal.name.length > 8 && `${meal.name?.slice(0, 7)} text-[18px]`}`}
                          >
                            {meal.name}
                          </Typography>
                        </div>
                        <div className='flex flex-row gap-2 w-full justify-center'>
                          <Typography className='text-white font-poppins font-semibold text-xs md:text-lg'>
                            {`${meal.unit} portion`}
                          </Typography>
                        </div>
                        <div className='flex flex-row gap-2 w-full items-center justify-center'>
                          <Typography className='text-green-500 font-poppins font-normal text-xs md:text-xl capitalize'>
                            {totalCal} cal
                          </Typography>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <div className='w-full border rounded-lg h-40 flex flex-col items-center justify-center border-green-500 shadow-lg shadow-green-500 transition-all duration-75 ease-linear'>
              <Typography className='text-xl text-white font-poppins font-semibold md:text-lg capitalize'>
                no custom food
              </Typography>
            </div>
          )}
        </div>
        {data?.length > 0 && (
          <div className='w-full flex justify-center py-3 px-2 mt-4'>
            <Button
              onClick={handleSave}
              className='bg-green-500 rounded-full w-64 h-10'
            >
              save
            </Button>
          </div>
        )}
        {buttonSave && (
          <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50'>
            <div className='border bg-white w-64 h-40 flex flex-col rounded-lg items-center gap-4 justify-center'>
              <Typography className='font-poppins font-semibold text-green-500 text-lg capitalize text-center'>
                custom meal selection saved successfull
              </Typography>
              <Button
                onClick={() => setButtonSave(false)}
                className='bg-green-500 font-poppins font-semibold text-white text-lg capitalize h-4 flex items-center justify-center'
              >
                oke
              </Button>
            </div>
          </div>
        )}
      </Swiper>
      <CustomMealPagination
        activeSlides={activeSlides}
        totalSlides={data.length}
        onClick={handlePaginationClicked}
      />
    </div>
  );
};

export default MealPlanCustom;
