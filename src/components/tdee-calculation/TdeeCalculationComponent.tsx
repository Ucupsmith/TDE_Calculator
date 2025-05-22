import { Card, CardBody, Typography } from '@material-tailwind/react';
import React from 'react';

interface TdeeProps {
  bmi: number;
  bmiCategory: string;
  bmr?: number;
  tdee: number;
  goal?: string;
}

const TdeeCalculationComponent: React.FC<TdeeProps> = ({
  bmi,
  tdee,
  bmiCategory
}) => {
  return (
    <div className='flex flex-row w-full px-3 gap-2'>
      <div className='w-1/2 flex flex-col items-center justify-around md:h-full md:gap-8 gap-4 h-72'>
        <Typography className='font-poppins font-normal text-white text-xs md:text-2xl capitalize'>
          your tdee score
        </Typography>
        <Card className='w-full md:w-[60%] md:h-60 h-32 rounded-[20px] md:rounded-2xl flex flex-col justify-center items-center bg-[#132A2E] border border-green-500'>
          <CardBody className='w-full flex flex-col gap-2 items-center justify-center'>
            <Typography className='font-bold font-poppins text-4xl text-green-500'>
              {Math.round(tdee).toLocaleString('id-ID', {
                style: 'decimal'
              })}
            </Typography>
            <Typography
              className={`font-thin font-poppins text-xs text-green-900 capitalize ${
                tdee === 0 ? 'text-[10px] md:text-lg' : 'text-[10px]'
              }`}
            >
              calories per day
            </Typography>
          </CardBody>
        </Card>
        <Typography className='md:w-72 font-poppins font-extralight text-white text-xs md:text-lg capitalize text-center'>
          TDEE adalah jumlah total kalori yang dibakar tubuh Anda dalam sehari,
          termasuk dari aktivitas dasar (seperti bernapas dan mencerna makanan)
          hingga aktivitas fisik.
        </Typography>
      </div>
      <div className='w-1/2 flex flex-col items-center justify-around md:h-full md:gap-8 gap-4 h-72'>
        <Typography className='font-poppins font-normal text-white text-xs md:text-2xl capitalize'>
          your bmi score
        </Typography>
        <Card
          className={`w-full md:w-[60%] md:h-60 border border-green-500 h-32 rounded-[20px] md:rounded-2xl flex flex-col justify-center items-center bg-[#132A2E] ${
            bmi < 18.5
              ? 'border-yellow-300'
              : bmi <= 23.9
              ? 'border-green-400'
              : bmi <= 24.9
              ? 'border-yellow-800'
              : bmi <= 29.9
              ? 'border-yellow-900'
              : bmi <= 31.0
              ? 'border-red-900'
              : 'border-red-900'
          }`}
        >
          <CardBody
            className={`w-full flex flex-col gap-2 items-center justify-center`}
          >
            <Typography
              className={`font-bold font-poppins text-4xl text-green-500 ${
                bmi < 18.5
                  ? 'text-yellow-300'
                  : bmi <= 23.9
                  ? 'text-green-400'
                  : bmi <= 24.9
                  ? 'text-yellow-800'
                  : bmi <= 29.9
                  ? 'text-yellow-900'
                  : bmi <= 31.0
                  ? 'text-red-900'
                  : 'text-red-900'
              }`}
            >
              {Math.floor(bmi).toLocaleString('id-ID', {
                style: 'decimal'
              })}
            </Typography>
            <Typography
              className={`font-thin font-poppins text-xs md:text-lg text-green-900 ${
                bmiCategory === 'Underweight'
                  ? 'text-yellow-300'
                  : bmiCategory === 'Normal'
                  ? 'text-green-400'
                  : bmiCategory === 'Obesity level 1'
                  ? 'text-yellow-800'
                  : bmiCategory === 'Obesity level 2'
                  ? 'text-yellow-900'
                  : bmiCategory === 'Obesity level 3'
                  ? 'text-red-900'
                  : bmiCategory
              }`}
            >
              {bmiCategory}
            </Typography>
          </CardBody>
        </Card>
        <Typography className='md:w-72 text-center font-poppins font-extralight text-white text-xs md:text-lg capitalize'>
          TDEE adalah jumlah total kalori yang dibakar tubuh Anda dalam sehari,
          termasuk dari aktivitas dasar (seperti bernapas dan mencerna makanan)
          hingga aktivitas fisik.
        </Typography>
      </div>
    </div>
  );
};

export default TdeeCalculationComponent;
