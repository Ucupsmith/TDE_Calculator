import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import { TdeeProps } from '../homepage/Section2';

interface PropsCardBmi {
  data: TdeeProps[];
  loading: boolean;
}
const CardBMI: React.FC<PropsCardBmi> = ({ data, loading = true }) => {
  return (
    <Swiper centeredSlides={true} slidesPerView={3} className='w-full h-60'>
      {data.length >= 0 && data.length !== null ? (
        data.map((item, idx: number) => {
          return (
            <SwiperSlide
              key={idx}
              className='w-full md:w-auto flex border justify-center items-center'
            >
              <Card className='md:w-96 rounded-[20px] w-72 h-72 py-2 px-2 bg-transparent border border-green-400'>
                <CardBody className='h-full flex flex-col items-center justify-center'>
                  <Typography className='font-bold font-poppins text-[100px] text-green-400 uppercase'>
                    {item.tdee}
                  </Typography>
                  <Typography className='font-normal font-poppins text-xs md:text-2xl capitalize text-green-400'>
                    Last Calculation : {item.lastCalculated}
                  </Typography>
                </CardBody>
              </Card>
            </SwiperSlide>
          );
        })
      ) : (
        <Card className='md:w-96 rounded-[20px] w-72 h-72 py-2 px-2 bg-transparent border border-green-400'>
          <CardBody className='h-full flex flex-col items-center justify-center'>
            <Typography className='font-bold font-poppins text-[100px] text-green-400 uppercase'>
              tes
            </Typography>
            <Typography className='font-normal font-poppins text-xs md:text-2xl capitalize text-green-400'>
              Last Calculation : tes
            </Typography>
          </CardBody>
        </Card>
      )}
    </Swiper>
  );
};

export default CardBMI;
