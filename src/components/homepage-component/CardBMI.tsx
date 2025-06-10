import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import { TdeeProps } from '../homepage/Section2';
import Image from 'next/image';
import TrashBin from '@/assets/homepage/trashbinremv.png';
import { useTdee } from '@/common/TdeeProvider';
import { CustomSlidesPagination } from '../custom-pagination/CustomPaginationSlides';
import { Swiper as SwiperInstance } from 'swiper';
import { Autoplay } from 'swiper/modules';

interface PropsCardBmi {
  data: TdeeProps[];
  loading?: boolean;
  onDelete: (tdeeId: number) => void;
}

const CardBMI: React.FC<PropsCardBmi> = ({ data, onDelete }) => {
  const [activeSlides, setActiveSlides] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );

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

  return (
    <div className='w-full flex flex-col gap-2 justify-center px-3'>
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
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
        onSwiper={(Swiper) => setSwiperInstance(Swiper)}
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
      <CustomSlidesPagination
        activeSlides={activeSlides}
        onClick={handlePaginationClicked}
        totalSlides={data?.length}
      />
    </div>
  );
};

export default CardBMI;
