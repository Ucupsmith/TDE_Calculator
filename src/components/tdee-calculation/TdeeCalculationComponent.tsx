import { SaveTdeeCalculationInterface } from '@/pages/tdee-calculator';
import { saveTdeeCalculation } from '@/repository/tdee.repository';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Typography
} from '@material-tailwind/react';
import Link from 'next/link';
import React, { useState } from 'react';

interface TdeeProps {
  onClick: boolean;
  onClose: () => void;
  bmi: number;
  bmiCategory: string;
  bmr?: string;
  tdee: number;
  goal?: string;
  onSubmit: () => void;
  onSave: () => void;
}

const TdeeCalculationComponent: React.FC<TdeeProps> = ({
  bmi,
  tdee,
  bmiCategory,
  goal,
  onClick,
  onClose,
  onSubmit,
  onSave
}) => {
  const [showModalSuccess, setShowModalSucces] = useState<boolean>(false);
  const handleSubmit = async () => {
    try {
      await onSubmit();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };
  const handleSave = async () => {
    try {
      await onSave();
      setShowModalSucces(true);
    } catch (error) {
      console.error('Failed to save TDEE:', error);
    }
  };
  return (
    <div className='flex flex-col w-full md:h-auto h-96 gap-3'>
      {goal && (
        <div className='flex w-full items-center justify-center'>
          <Typography className='font-poppins font-semibold text-white text-sm md:text-lg'>
            your goals :{' '}
            {goal === 'LoseWeight'
              ? 'Lose Weight 🔥'
              : goal === 'MaintainWeight'
                ? 'Maintain Weight'
                : goal === 'GainWeight'
                  ? 'Gain Weight 💪'
                  : goal}
          </Typography>
        </div>
      )}
      <div
        onClick={() => handleSubmit()}
        className='flex flex-row w-full px-3 gap-2'
      >
        <div
          className={`w-1/2 flex flex-col items-center justify-start md:h-full md:gap-8 gap-4 h-72`}
        >
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
            TDEE adalah jumlah total kalori yang dibakar tubuh Anda dalam
            sehari, termasuk dari aktivitas dasar (seperti bernapas dan mencerna
            makanan) hingga aktivitas fisik.
          </Typography>
        </div>
        <div className='w-1/2 flex flex-col items-center justify-start md:h-full md:gap-8 gap-4 h-72'>
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
          <Typography className='md:w-72 font-poppins font-extralight text-white text-xs md:text-lg capitalize text-center'>
            TDEE adalah jumlah total kalori yang dibakar tubuh Anda dalam
            sehari, termasuk dari aktivitas dasar (seperti bernapas dan mencerna
            makanan) hingga aktivitas fisik.
          </Typography>
        </div>
      </div>
      {onClick && (
        <div className='flex flex-col items-center justify-end bg-[#132A2E] bg-opacity-0 rounded-xl fixed inset-0 z-10'>
          <div className='flex items-center justify-center flex-col w-60 md:w-96 inset-10 bg-opacity-50 h-40 bg-black gap-2 border border-green-500 rounded-xl'>
            <Typography className='font-poppins font-semibold text-white text-xs md:text-lg'>
              Would You Like To Save Your Tdee?
            </Typography>
            <div className='flex flex-row gap-3'>
              <Button
                onClick={onClose}
                className='bg-red-800 w-20 h-6 flex justify-center items-center py-2'
              >
                no
              </Button>
              <Button
                onClick={async () => {
                  await handleSave();
                  onClose();
                }}
                className='bg-green-800 w-20 h-6 flex justify-center items-center py-2'
              >
                yes
              </Button>
            </div>
          </div>
        </div>
      )}
      {showModalSuccess && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-6 flex flex-col items-center justify-center gap-3'>
            <div className='text-green-600 text-4xl'>✓</div>
            <Typography className='text-gray-800 font-semibold'>
              TDEE successfully saved!
            </Typography>
            <Button
              onClick={() => setShowModalSucces(false)}
              className='bg-green-700 text-white px-4 py-1 rounded'
            >
              OK
            </Button>
            <Link
              href={'/homepage'}
              className='font-poppins font-normal underline text-blue-700 text-xs md:text-lg'
            >
              see the result!
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TdeeCalculationComponent;
