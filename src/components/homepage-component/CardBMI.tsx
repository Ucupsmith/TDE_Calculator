import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import { TdeeProps } from '../homepage/Section2';
import Image from 'next/image';
import TrashBin from '@/assets/homepage/trashbinremv.png';

interface PropsCardBmi {
  data: TdeeProps[];
  loading?: boolean;
  onDelete: (tdeeId: number) => void;
}

const CardBMI: React.FC<PropsCardBmi> = ({ data, onDelete }) => {
  return (
    <div className='flex flex-row -z-0 overflow-y-auto overflow-x-auto w-full gap-10'>
      {data?.length >= 0 &&
        data?.length !== 0 &&
        data?.map((item) => {
          return (
            <div key={item.tdeeId} className='flex justify-center items-center'>
              <Card className='md:w-96 flex flex-col rounded-[20px] w-72 h-60 py-2 px-2 bg-transparent border border-green-400'>
                <div
                  onClick={() => onDelete(Number(item.tdeeId))}
                  className='flex flex-row justify-end px-3 cursor-pointer'
                >
                  <Image src={TrashBin} alt='' className='w-5 h-7' />
                </div>
                <CardBody className='h-full flex flex-col items-center justify-between gap-2'>
                  <div className='flex flex-col w-full h-full items-center justify-center gap-2 px-2'>
                    <Typography className='font-bold font-poppins text-green-400 uppercase text-6xl md:text-5xl'>
                      {Math.ceil(Number(item.tdee_result))}
                    </Typography>
                    <Typography className='font-normal font-poppins text-xs md:text-xl capitalize text-green-400'>
                      Last Calculation : {item.calculation_date.split('T')[0]}
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })}
    </div>
  );
};

export default CardBMI;
