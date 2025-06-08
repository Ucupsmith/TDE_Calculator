import { useEffect, useState } from 'react';
import { Swiper as SwiperInstance } from 'swiper'; //copy this to parent element

interface CustomSlidesPagination {
  totalSlides: number;
  activeSlides: number;
  onClick: (idx: number) => void;
}

export const CustomSlidesPagination: React.FC<CustomSlidesPagination> = ({
  totalSlides,
  activeSlides,
  onClick
}) => {
  // const [activeSlides, setActiveSlides] = useState<number>(0); <- use this in parent component
  //   const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>( <-import Swiper as SwiperInstance
  //     null
  //   );
  // use this code below on the parrent component
  //   useEffect(() => {
  //     if (swiperInstance !== null) {
  //       swiperInstance.on('slideChange', () => {
  //         setActiveSlides(swiperInstance.realIndex);
  //       });
  //     }
  //   }, [swiperInstance]);

  //   const handlePaginationClicked = (idx: number): void => {
  //     setActiveSlides(idx);
  //     if (swiperInstance !== null) {
  //       swiperInstance.slideToLoop(idx);
  //     }

  //     if (swiperInstance !== null) {
  //       swiperInstance.autoplay.start();
  //     }
  //   };

  //   onSwiper((swiper)=>setSwiperInstance(swiper))
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
