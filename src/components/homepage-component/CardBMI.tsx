import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import { TdeeProps } from '../homepage/Section2';
import Image from 'next/image';
import TrashBin from '@/assets/homepage/trashbinremv.png';
import { useTdee } from '@/common/TdeeProvider';

interface PropsCardBmi {
  data: TdeeProps[];
  loading?: boolean;
  onDelete: (tdeeId: number) => void;
}

const CardBMI: React.FC<PropsCardBmi> = ({ data, onDelete }) => {
  return (
    <div className='flex flex-row px-3'>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1 },
          720: { slidesPerView: 3 },
          1440: { slidesPerView: 3 }
        }}
        slidesPerView={3}
        spaceBetween={150}
        className='w-full md:w-[1100px]'
        pagination={{
          dynamicBullets: true
        }}
      >
        {data?.length > 0 ? (
          data?.map((item, idx: number) => {
            const tdeeIdNumber = Number(item.tdeeId);
            if (isNaN(tdeeIdNumber)) {
              console.warn(
                `Invalid tdeeId received for index ${idx}:`,
                item.tdeeId
              );
              return null;
            }
            return (
              <SwiperSlide key={idx}>
                <div className='flex flex-row w-full'>
                  <Card className='md:w-96 flex flex-col rounded-[20px] w-72 h-60 py-2 px-2 bg-transparent border border-green-400'>
                    <div
                      onClick={() => onDelete(tdeeIdNumber)}
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
                          Last Calculation :{' '}
                          {item.calculation_date.split('T')[0]}
                        </Typography>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <div className='w-full h-full flex justify-center items-center'>
            <Typography className='font-normal font-poppins text-white text-sm md:text-lg'>
              No TDEE history available.
            </Typography>
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default CardBMI;
