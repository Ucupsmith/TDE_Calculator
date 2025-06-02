import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography
} from '@material-tailwind/react';
import React, { useState } from 'react';

// interface MealPlanProps {
//   data:
// }

const MealPlanSection3 = () => {
  const [count, setCount] = useState<number>(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count > 0 ? count - 1 : 0);
  };
  return (
    <div className='w-full flex flex-col'>
      <div className='flex flex-col gap-2 px-2 py-3 items-center justify-center'>
        <Typography className='font-poppins font-normal text-green-500 text-lg md:text-lg text-center capitalize'>
          Lets choose how you prepare your meal
        </Typography>
        <div className='flex flex-wrap w-full gap-2'>
          <input type='checkbox' className='sr-only' />
          <Card className='w-40 border-[3px] cursor-pointer rounded-xl peer-checked:ring-blue-500 border-green-500  peer-checked:grayscale-0 active:scale-95 transition-all'>
            <CardBody className='flex flex-col items-center justify-between py-3 px-2 bg-[#132A2E] gap-3'>
              <div className='flex flex-col gap-2 w-full items-center justify-center'>
                <Avatar
                  className='border flex items-center justify-center text-center border-green-500 rounded-xl bg-[#132A2E] w-40 h-32 text-white px-3 py-2 focus:border-2 focus:border-green-500 '
                  placeholder='custom meal'
                />
              </div>
              <div className='w-full flex justify-center gap-2'>
                <Typography className='text-green-500 font-poppins font-normal text-lg md:text-xl capitalize'>
                  meal
                </Typography>
              </div>
              <div className='flex flex-row gap-2 w-full justify-between items-center border-[3px] rounded-lg border-[#34D399]'>
                <div
                  onClick={handleDecrement}
                  className='flex items-center justify-center w-10 h-8 text-red-900'
                >
                  <Typography className='font-poppins font-semibold text-xl md:text-lg text-red-900'>
                    -
                  </Typography>
                </div>
                <div className='bg-[#132A2E] w-full h-10 text-white px-3 py-2 text-center'>
                  {count}
                </div>

                <div
                  onClick={handleIncrement}
                  className='flex items-center justify-center w-10 h-8 text-green-500'
                >
                  <Typography className='font-poppins font-semibold text-xl md:text-lg text-green-500'>
                    +
                  </Typography>
                </div>
              </div>
              <div className='flex flex-row gap-2 w-full items-center justify-center'>
                <Typography className='text-green-500 font-poppins font-normal text-xs md:text-xl capitalize'>
                  100 g
                </Typography>
                <Typography className='text-green-500 font-poppins font-normal text-xs md:text-xl capitalize'>
                  /150 cal
                </Typography>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MealPlanSection3;
