import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';

interface Props {
  Tdee: number;
  Calculation: number;
}
const CardBMI: React.FC<Props> = ({ Tdee, Calculation }) => {
  return (
    <Swiper className='w-full'>
      <SwiperSlide className='md:w-auto flex flex-row justify-center items-center'>
        <Card className='md:w-96 rounded-[20px] w-72 h-72 py-2 px-2 bg-transparent border border-green-400'>
          <CardBody className='h-full flex flex-col items-center justify-center'>
            <Typography className='font-bold font-poppins text-[100px] text-green-400 uppercase'>
              {Tdee}
            </Typography>
            <Typography className='font-normal font-poppins text-xs md:text-2xl capitalize text-green-400'>
              Last Calculation : {Calculation}
            </Typography>
          </CardBody>
        </Card>
      </SwiperSlide>
    </Swiper>
  );
};

export default CardBMI;
